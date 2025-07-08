from fastapi import APIRouter, Depends
from services.analysis_service import get_threat_summary
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db.session import get_db
import pandas as pd
from sqlalchemy import text
from db.session import engine
import os
from dotenv import load_dotenv

load_dotenv()

TABLE = os.getenv("DB_TABLE")

router = APIRouter()

@router.get("/summary/threat-categories")
def threat_categories():
    return get_threat_summary()

@router.get("/summary/metrics")
def get_metrics():
    query = text(f"SELECT * FROM {TABLE}")
    with engine.connect() as connection:
        df = pd.read_sql(query, connection)

    return {
        "total_threats": len(df),
        "malware": len(df[df["Category"] == "Malware"]),
        "vulnerabilities": len(df[df["Category"] == "Vulnerability"])
    }