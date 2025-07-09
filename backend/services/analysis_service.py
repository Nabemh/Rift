# services/analysis_service.py
from db.session import engine
import pandas as pd
from agents.analysis_agent import AnalysisAgent
import os
from dotenv import load_dotenv

load_dotenv()
TABLE = os.getenv("DB_TABLE")

def get_top_threat_categories(limit=10):
    """Get top threat categories with configurable limit"""
    with engine.connect() as connection:
        df = pd.read_sql(f"SELECT * FROM {TABLE}", connection)

        # Get comprehensive threat categories
        type_summary = df.groupby('Category').agg({
            'TID': 'count',
            'IP': pd.Series.nunique
        }).rename(columns={'TID': 'Count of TID', 'IP': 'Count of IP'})

        # Sort and get top N
        top_categories = type_summary.sort_values('Count of TID', ascending=False).head(limit)

        return {
            "summary_table": top_categories.reset_index().to_dict(orient="records"),
            "total_categories": len(type_summary)
        }

def get_top_malware(limit=10):
    """Get top malware with configurable limit"""
    with engine.connect() as connection:
        df = pd.read_sql(f"SELECT * FROM {TABLE}", connection)

        # Filter for malware and spambot
        malware_df = df[df['Type'].isin(['Malware', 'SpamBot'])]
        malware_summary = malware_df.groupby('Infection').agg({
            'TID': 'count',
            'IP': pd.Series.nunique
        }).rename(columns={
            'TID': 'Frequency of Occurrence',
            'IP': 'Count of Unique IPs'
        }).sort_values(by='Frequency of Occurrence', ascending=False).head(limit)

        return {
            "summary_table": malware_summary.reset_index().to_dict(orient="records"),
            "total_malware": len(malware_summary)
        }

def get_top_cc_ips(limit=10):
    """Get top C&C IPs with configurable limit"""
    with engine.connect() as connection:
        df = pd.read_sql(f"SELECT * FROM {TABLE}", connection)

        ccip_summary = df.groupby('CC_Ip')['IP'].nunique().sort_values(ascending=False).head(limit)

        return {
            "summary_table": ccip_summary.reset_index().rename(
                columns={"CC_Ip": "IP", "IP": "Unique Count"}
            ).to_dict(orient="records"),
            "total_cc_ips": len(ccip_summary)
        }

def get_top_vulnerabilities(limit=10):
    """Get top vulnerabilities with configurable limit"""
    with engine.connect() as connection:
        df = pd.read_sql(f"SELECT * FROM {TABLE}", connection)

        vuln_df = df[df["Category"] == "Vulnerability"]
        top = vuln_df["Infection"].value_counts().head(limit).reset_index()

        return {
            "summary_table": top.rename(columns={"index": "Infection", "Infection": "Count"}).to_dict(orient="records"),
            "total_vulnerabilities": len(top)
        }

def get_top_affected_isps(limit=10):
    """Get top most frequently occurring ASNNames (ISPs) with non-null values"""
    with engine.connect() as connection:
        # Quotes preserve case sensitivity for PostgreSQL column names
        df = pd.read_sql(f'SELECT "ASNName" FROM {TABLE}', connection)

        # Drop missing/null values
        df = df.dropna(subset=["ASNName"])

        # Remove 'unverified' entries
        df = df[df["ASNName"] != "unverified"]

        # Count occurrences of each ASNName
        top_isps = df["ASNName"].value_counts().head(limit).reset_index()
        top_isps.columns = ["ASNName", "Count"]

        return {
            "summary_table": top_isps.to_dict(orient="records"),
            "total_entries": len(df["ASNName"].unique())
        }


def get_top_regions(limit=10):
    """Get top regions with configurable limit"""
    with engine.connect() as connection:
        df = pd.read_sql(f"SELECT * FROM {TABLE}", connection)

        region_summary = df.groupby('Region').agg({
            'TID': 'count',
            'IP': pd.Series.nunique
        }).rename(columns={'TID': 'Count of TID', 'IP': 'Count of Unique IP'})

        top_regions = region_summary.sort_values('Count of TID', ascending=False).head(limit)

        return {
            "summary_table": top_regions.reset_index().to_dict(orient="records"),
            "total_regions": len(region_summary)
        }

def get_region_impact_summary(limit=20):
    """Return threat counts by city (lowercased), excluding 'unverified' entries"""
    with engine.connect() as connection:
        df = pd.read_sql(f"SELECT * FROM {TABLE}", connection)

    if "City" not in df.columns:
        return {"error": "No 'City' column found."}

    # Drop NaNs and normalize case
    df = df.dropna(subset=["City"])
    df["City"] = df["City"].str.lower().str.strip()

    # Remove 'unverified' entries
    df = df[df["City"] != "unverified"]

    # Group by city and count threats
    summary = (
        df.groupby("City")
          .agg({"TID": "count"})
          .rename(columns={"TID": "Threat Count"})
          .sort_values("Threat Count", ascending=False)
          .head(limit)
    )

    return {
        "heat_data": summary.reset_index().to_dict(orient="records"),
        "total_cities": summary.shape[0]
    }

