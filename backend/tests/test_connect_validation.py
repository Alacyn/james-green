"""Validation tests for /api/connect - email/phone gates (422 + no persistence)."""
import os
import time
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent.parent / ".env")
BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
if not BASE_URL:
    fe_env = Path(__file__).parent.parent.parent / "frontend" / ".env"
    for line in fe_env.read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]
TS = int(time.time())


def _db():
    return MongoClient(MONGO_URL)[DB_NAME]


def _base_payload(**overrides):
    p = {
        "firstName": "TESTVal",
        "lastName": "User",
        "email": f"test_valid_{TS}@example.com",
        "phone": "(972) 555-1234",
        "dreNumber": "",
        "consent": True,
        "source": "popup",
        "interests": [],
    }
    p.update(overrides)
    return p


def test_invalid_email_rejected_422():
    bad_email = f"not-an-email-{TS}"
    payload = _base_payload(email=bad_email)
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=15)
    assert r.status_code == 422, r.text
    assert "valid email" in r.json().get("detail", "").lower()
    # no persistence
    doc = _db().connect_inquiries.find_one({"email": bad_email})
    assert doc is None


def test_invalid_phone_too_short_rejected_422():
    email = f"test_short_{TS}@example.com"
    payload = _base_payload(email=email, phone="12")
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=15)
    assert r.status_code == 422, r.text
    assert "valid phone" in r.json().get("detail", "").lower()
    doc = _db().connect_inquiries.find_one({"email": email})
    assert doc is None


def test_invalid_phone_nondigit_rejected_422():
    email = f"test_abc_{TS}@example.com"
    payload = _base_payload(email=email, phone="abc")
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=15)
    assert r.status_code == 422, r.text
    assert "valid phone" in r.json().get("detail", "").lower()
    doc = _db().connect_inquiries.find_one({"email": email})
    assert doc is None


def test_valid_formatted_phone_and_email_accepted():
    email = f"test_ok_{TS}@example.com"
    payload = _base_payload(email=email, phone="(972) 555-1234")
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=45)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("ok") is True
    doc = _db().connect_inquiries.find_one({"email": email})
    assert doc is not None
    # cleanup
    _db().connect_inquiries.delete_many({"email": email})


def test_double_at_email_rejected():
    """Regression: 'bad@@email' variant from contact page test."""
    email = "bad@@email"
    payload = _base_payload(email=email, phone="555-000-1234")
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=15)
    assert r.status_code == 422, r.text
    doc = _db().connect_inquiries.find_one({"email": email})
    assert doc is None
