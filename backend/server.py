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
    order: int = 0


SAMPLE_PROPERTIES = [
    Property(address="4351 Berylline Lane", city="Prosper", state="Texas", beds="", baths="", sqft="", price="", image_url="", order=1),
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
