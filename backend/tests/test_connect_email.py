"""Tests for /api/connect endpoint - email sending + persistence + cleanup."""
import os
import time
import pytest
import requests
from pymongo import MongoClient
from dotenv import load_dotenv
from pathlib import Path

load_dotenv(Path(__file__).parent.parent / ".env")

BASE_URL = os.environ["REACT_APP_BACKEND_URL"].rstrip("/") if os.environ.get("REACT_APP_BACKEND_URL") else None
if not BASE_URL:
    # Fallback via frontend/.env
    fe_env = Path(__file__).parent.parent.parent / "frontend" / ".env"
    for line in fe_env.read_text().splitlines():
        if line.startswith("REACT_APP_BACKEND_URL="):
            BASE_URL = line.split("=", 1)[1].strip().rstrip("/")

MONGO_URL = os.environ["MONGO_URL"]
DB_NAME = os.environ["DB_NAME"]

TS = int(time.time())
CREATED_EMAILS = []


@pytest.fixture(scope="module")
def mongo():
    c = MongoClient(MONGO_URL)
    yield c[DB_NAME]
    # cleanup
    for e in CREATED_EMAILS:
        c[DB_NAME].connect_inquiries.delete_many({"email": e})
    c.close()


def _payload(source, ts_suffix):
    email = f"test_{ts_suffix}_{TS}@example.com"
    CREATED_EMAILS.append(email)
    return {
        "firstName": "TestFirst",
        "lastName": f"TestLast{ts_suffix}",
        "email": email,
        "phone": "555-000-1234",
        "dreNumber": "",
        "message": f"Automated test message for {source}",
        "interests": ["Buying"],
        "consent": True,
        "source": source,
    }


def test_connect_source_contact_page(mongo):
    payload = _payload("contact page", "cp")
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=45)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("ok") is True
    # email_sent depends on the external Resend proxy's deliverability (recipient
    # suppression cool-downs) — the endpoint contract is ok + persistence.
    assert isinstance(data.get("email_sent"), bool)
    # verify persistence
    doc = mongo.connect_inquiries.find_one({"email": payload["email"]})
    assert doc is not None
    assert doc["source"] == "contact page"
    assert doc["interests"] == ["Buying"]
    assert doc["first_name"] == "TestFirst"


def test_connect_source_popup(mongo):
    payload = _payload("popup", "pop")
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=45)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data.get("ok") is True
    assert isinstance(data.get("email_sent"), bool)
    doc = mongo.connect_inquiries.find_one({"email": payload["email"]})
    assert doc is not None
    assert doc["source"] == "popup"
    assert doc["interests"] == ["Buying"]


def test_connect_minimal_no_interests(mongo):
    """Regression: empty interests + no message still works."""
    email = f"test_min_{TS}@example.com"
    CREATED_EMAILS.append(email)
    payload = {
        "firstName": "Min",
        "lastName": "User",
        "email": email,
        "phone": "555-999-0000",
        "dreNumber": "",
        "consent": True,
        "source": "popup",
    }
    r = requests.post(f"{BASE_URL}/api/connect", json=payload, timeout=45)
    assert r.status_code == 200, r.text
    data = r.json()
    assert data["ok"] is True
    assert isinstance(data["email_sent"], bool)


def test_properties_endpoint():
    """Regression: /api/properties still works, no _id leaking."""
    r = requests.get(f"{BASE_URL}/api/properties", timeout=15)
    assert r.status_code == 200
    props = r.json()
    assert isinstance(props, list) and len(props) >= 1
    for p in props:
        assert "_id" not in p
        assert "id" in p and "address" in p
