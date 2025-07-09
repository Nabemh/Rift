# router file
from fastapi import APIRouter, Query
from services.analysis_service import (
    get_top_threat_categories,
    get_top_malware,
    get_top_cc_ips,
    get_top_vulnerabilities,
    get_top_regions,
    get_top_affected_isps,
)
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

# Updated endpoints frontend calls
@router.get("/summary/threat-categories")
def threat_categories_summary(limit: int = Query(10, ge=1, le=50)):
    return get_top_threat_categories(limit)

@router.get("/summary/malware")
def malware_summary(limit: int = Query(10, ge=1, le=50)):
    return get_top_malware(limit)

@router.get("/summary/c2-ips")
def c2_ips_summary(limit: int = Query(10, ge=1, le=50)):
    return get_top_cc_ips(limit)

@router.get("/summary/vulnerabilities")
def vulnerabilities_summary(limit: int = Query(10, ge=1, le=50)):
    return get_top_vulnerabilities(limit)

@router.get("/summary/top-isps")
def top_isps(limit: int = Query(10, ge=1, le=50)):
    return get_top_affected_isps(limit)

@router.get("/summary/regions")
def regions_summary(limit: int = Query(10, ge=1, le=50)):
    return get_top_regions(limit)

# Old endpoints for backward compatibility
@router.get("/visuals/top-threats")
def top_threats():
    return get_top_threat_categories()

@router.get("/visuals/top-malware")
def top_malware():
    return get_top_malware()

@router.get("/visuals/top-ccips")
def top_ccips():
    return get_top_cc_ips()

@router.get("/visuals/top-vulnerabilities")
def top_vulns():
    return get_top_vulnerabilities()