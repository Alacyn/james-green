from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator, AliasGenerator
from typing import Optional, List, Annotated
from bson import ObjectId
from pydantic.alias_generators import to_camel
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# --- Emergent managed email (Resend proxy) — branded for James Green | eXp Luxury ---
import re
import ipaddress
import httpx
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO")
OWNER_EMAIL = os.environ["OWNER_EMAIL"]

EMAIL_RE = re.compile(r"^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$")

logger = logging.getLogger(__name__)

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} ≠ real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as client:
            resp = await client.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# --- MongoDB adherence helpers ---
def coerce_object_id(v):
    return str(v) if isinstance(v, ObjectId) else v


PyObjectId = Annotated[str, BeforeValidator(coerce_object_id)]


class BaseDocument(BaseModel):
    model_config = ConfigDict(populate_by_name=True, extra="ignore")

    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    @classmethod
    def from_mongo(cls, doc):
        if doc is None:
            return None
        doc = dict(doc)
        doc["id"] = str(doc.pop("_id", None) or doc.get("id") or ObjectId())
        return cls(**doc)

    def to_mongo(self) -> dict:
        d = self.model_dump()
        d["_id"] = ObjectId(d.pop("id"))
        d = {
            k: (v.isoformat() if isinstance(v, datetime) else v)
            for k, v in d.items()
        }
        return d


# --- Models ---
class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusCheckCreate(BaseModel):
    client_name: str


class ConnectInquiry(BaseDocument):
    first_name: str
    last_name: str
    email: str
    phone: str
    dre_number: str
    total_sales: Optional[str] = None
    consent: bool = False
    message: str = ""
    interests: List[str] = []
    source: str = ""
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class ConnectInquiryCreate(BaseModel):
    model_config = ConfigDict(
        populate_by_name=True,
        alias_generator=AliasGenerator(alias=to_camel),
        extra="ignore",
    )

    first_name: str
    last_name: str
    email: str
    phone: str
    dre_number: str
    total_sales: Optional[str] = None
    consent: bool = False
    message: str = ""
    interests: List[str] = []
    source: str = ""


# --- Routes ---
@api_router.get("/")
async def root():
    return {"message": "Hello World"}


@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)

    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()

    _ = await db.status_checks.insert_one(doc)
    return status_obj


@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)

    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])

    return status_checks


@api_router.post("/connect")
async def create_connect_inquiry(input: ConnectInquiryCreate):
    if not EMAIL_RE.match(input.email.strip()):
        raise HTTPException(status_code=422, detail="Please enter a valid email address.")
    phone_digits = re.sub(r"\D", "", input.phone)
    if not (7 <= len(phone_digits) <= 15):
        raise HTTPException(status_code=422, detail="Please enter a valid phone number.")

    inquiry = ConnectInquiry(
        first_name=input.first_name,
        last_name=input.last_name,
        email=input.email,
        phone=input.phone,
        dre_number=input.dre_number,
        total_sales=input.total_sales,
        consent=input.consent,
        message=input.message,
        interests=input.interests,
        source=input.source,
    )
    _ = await db.connect_inquiries.insert_one(inquiry.to_mongo())

    # Branded notification to James — fixed recipient + server-side template (G4)
    source_labels = {"contact page": "Contact page", "popup": "Private Inquiry popup"}
    source_label = source_labels.get(input.source, "Private Inquiry popup")
    subject = f"New Inquiry — {input.first_name} {input.last_name}".strip()
    interests_text = ", ".join(input.interests) if input.interests else "—"
    message_text = input.message if input.message.strip() else "—"
    consent_text = "Yes — agrees to be contacted" if input.consent else "Not given"
    html = (
        '<table role="presentation" width="100%" style="background:#16100C;padding:32px 0;">'
        '<tr><td align="center"><table role="presentation" width="560" '
        'style="background:#221810;padding:36px;border:1px solid rgba(168,146,110,0.35);">'
        '<tr><td style="font-family:Arial,sans-serif;">'
        f'<p style="margin:0 0 6px;color:#A8926E;font-size:11px;letter-spacing:3px;">'
        f'PRIVATE INQUIRY — {escape(source_label).upper()}</p>'
        f'<p style="margin:0 0 24px;color:#F1E6D7;font-size:19px;letter-spacing:2px;">'
        f'NEW INQUIRY — {escape(input.first_name).upper()} {escape(input.last_name).upper()}</p>'
        '<table role="presentation" width="100%" style="color:#D8CCC0;font-size:13px;'
        'font-family:Arial,sans-serif;line-height:1.9;">'
        f'<tr><td style="width:110px;color:#A8926E;">Email</td><td>{escape(input.email)}</td></tr>'
        f'<tr><td style="color:#A8926E;">Phone</td><td>{escape(input.phone)}</td></tr>'
        f'<tr><td style="color:#A8926E;">Interested In</td><td>{escape(interests_text)}</td></tr>'
        f'<tr><td style="color:#A8926E;">Message</td><td>{escape(message_text)}</td></tr>'
        f'<tr><td style="color:#A8926E;">Consent</td><td>{consent_text}</td></tr>'
        '</table>'
        f'<p style="margin:26px 0 0;font-size:11px;color:#8A7A68;">'
        f'Reach {escape(input.first_name)} at {escape(input.email)} or {escape(input.phone)}. '
        f'Sent by {escape(EMAIL_FROM_NAME)}.</p>'
        '</td></tr></table></td></tr></table>'
    )
    try:
        await send_email(to=OWNER_EMAIL, subject=subject, html=html)
        email_sent = True
    except Exception:
        email_sent = False
        logger.error(f"Notification email not delivered for inquiry {inquiry.id} ({input.email})")

    return {
        "ok": True,
        "id": inquiry.id,
        "message": "Thank you — James will connect with you personally.",
        "email_sent": email_sent,
    }


class Property(BaseDocument):
    address: str
    city: str
    state: str
    beds: str
    baths: str
    sqft: str
    price: str
    image_url: str
    zip: str = ""
    photos: List[str] = []
    description: str = ""
    order: int = 0


BERYLLINE_PHOTOS = [
    "/images/berylline-1.jpg",
    "/images/berylline-2.jpg",
    "/images/berylline-3.jpg",
    "/images/berylline-4.jpg",
    "/images/berylline-5.jpg",
    "/images/berylline-6.jpg",
    "/images/berylline-7.jpg",
]

BERYLLINE_DESCRIPTION = (
    "Welcome to 4351 Berylline Lane, a beautifully designed 6-bedroom, 4.5-bath home on a quiet "
    "cul-de-sac in the sought-after Windsong Ranch community. Built in 2024 and offering 3,764 "
    "square feet of thoughtfully designed living space, this home blends modern style, "
    "functionality, and an exceptional lifestyle. Step inside to soaring ceilings, abundant "
    "natural light, and an open-concept floor plan designed for everyday living and entertaining. "
    "The flexible layout features dual primary suites, one on each level, ideal for "
    "multigenerational living, extended guests, or a growing family. Upstairs, the spacious "
    "primary suite provides a private retreat overlooking the expansive backyard. A standout "
    "feature is the oversized game room with direct access to a private balcony overlooking the "
    "cul-de-sac and adjacent walking trail. Whether enjoying morning coffee, unwinding after a "
    "long day, or gathering with family and friends, this unique space offers beautiful views "
    "and a connection to the surrounding green space. Situated on an oversized 10,106-square-foot "
    "lot, the backyard offers plenty of room to relax, entertain, and create lasting memories. "
    "The pergola-covered patio provides the perfect setting for outdoor dining and gatherings, "
    "while the spacious yard offers endless possibilities. Beyond the home itself, Windsong Ranch "
    "is known for its lifestyle. Residents enjoy miles of scenic walking and biking trails, "
    "resort-style amenities, top-rated Prosper ISD schools, and a true sense of community. It is "
    "the kind of neighborhood where families take evening walks, neighbors connect, and kids "
    "still play outside. Located moments from community trails and amenities, this home offers "
    "the perfect balance of privacy, convenience, and resort-style living. More than just a home, "
    "it is an opportunity to enjoy one of Prosper's premier master-planned communities while "
    "experiencing the comfort, space, and flexibility of a nearly new home in an exceptional "
    "location."
)

SAMPLE_PROPERTIES = [
    Property(address="4351 Berylline Lane", city="Prosper", state="TX", zip="75078", beds="6 Beds", baths="4.5 Baths", sqft="3,764 Sq.Ft.", price="$879,000", image_url="/images/berylline-1.jpg", photos=BERYLLINE_PHOTOS, description=BERYLLINE_DESCRIPTION, order=1),
]


@api_router.get("/properties")
async def get_properties():
    count = await db.properties.count_documents({})
    if count == 0:
        await db.properties.insert_many([p.to_mongo() for p in SAMPLE_PROPERTIES])
    docs = await db.properties.find({}).sort("order", 1).to_list(100)
    return [Property.from_mongo(doc).model_dump() for doc in docs]


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
