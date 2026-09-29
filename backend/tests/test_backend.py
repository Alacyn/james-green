"""Backend regression tests for James Green portfolio (contact + properties)."""
import os
import pytest
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent.parent / ".env")

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
if not BASE_URL:
    # fallback read from frontend .env
    with open("/app/frontend/.env") as f:
        for line in f:
            if line.startswith("REACT_APP_BACKEND_URL="):
                BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]


@pytest.fixture(scope="module")
def db():
    c = MongoClient(MONGO_URL)
    yield c[DB_NAME]
    c.close()


# --- Health ---
def test_root():
    r = requests.get(f"{BASE_URL}/api/")
    assert r.status_code == 200
    assert r.json().get("message") == "Hello World"


# --- Connect inquiry (contact form) ---
def test_connect_create_camelCase_persists(db):
    payload = {
        "firstName": "TESTJames",
        "lastName": "TESTGreen",
        "email": "test_contact@example.com",
        "phone": "555-0100",
        "dreNumber": "",
        "message": "",
        "interests": ["Buying"],
        "consent": True,
    }
    r = requests.post(f"{BASE_URL}/api/connect", json=payload)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["ok"] is True
    assert "id" in data

    doc = db.connect_inquiries.find_one({"first_name": "TESTJames", "email": "test_contact@example.com"})
    assert doc is not None
    assert doc["last_name"] == "TESTGreen"
    assert doc["interests"] == ["Buying"]
    assert doc["consent"] is True
    db.connect_inquiries.delete_many({"first_name": "TESTJames"})


def test_connect_minimal_no_interests(db):
    payload = {
        "firstName": "TESTMin",
        "lastName": "",
        "email": "min@example.com",
        "phone": "555-0101",
        "dreNumber": "",
        "consent": True,
        "interests": [],
    }
    r = requests.post(f"{BASE_URL}/api/connect", json=payload)
    assert r.status_code == 200, r.text
    db.connect_inquiries.delete_many({"first_name": "TESTMin"})


def test_connect_invalid_missing_required():
    # missing required fields → 422
    r = requests.post(f"{BASE_URL}/api/connect", json={"firstName": "X"})
    assert r.status_code == 422


# --- Properties ---
def test_properties_list():
    r = requests.get(f"{BASE_URL}/api/properties")
    assert r.status_code == 200
    data = r.json()
    assert isinstance(data, list)
    assert len(data) >= 1
    p = data[0]
    for k in ("id", "address", "city", "photos", "description"):
        assert k in p
    assert "_id" not in p  # mongo _id excluded
    assert len(p["photos"]) == 7
