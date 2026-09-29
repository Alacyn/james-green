from fastapi import FastAPI, APIRouter
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
    inquiry = ConnectInquiry(
        first_name=input.first_name,
        last_name=input.last_name,
        email=input.email,
        phone=input.phone,
        dre_number=input.dre_number,
        total_sales=input.total_sales,
        consent=input.consent,
    )
    _ = await db.connect_inquiries.insert_one(inquiry.to_mongo())
    return {
        "ok": True,
        "id": inquiry.id,
        "message": "Thank you — our team will be in touch shortly.",
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
    Property(address="4351 Berylline Lane", city="Prosper", state="Texas", beds="6 Beds", baths="4.5 Baths", sqft="3,764 Sq.Ft.", price="$879,000", image_url="/images/berylline-1.jpg", photos=BERYLLINE_PHOTOS, description=BERYLLINE_DESCRIPTION, order=1),
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
