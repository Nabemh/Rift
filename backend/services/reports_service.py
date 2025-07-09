import requests
from datetime import datetime
from utils.filter import is_telecom_related, extract_keywords
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta

load_dotenv()
NVD_API_KEY = os.getenv("NVD_API_KEY")
NVD_BASE_URL = "https://services.nvd.nist.gov/rest/json/cves/2.0"

def fetch_filtered_cves(limit: int = 10):
    """Fetch and filter NVD CVEs for telecom relevance"""
    headers = {"apiKey": NVD_API_KEY} if NVD_API_KEY else {}

    # NVD requires both start and end dates
    end_date = datetime.utcnow()
    start_date = end_date - timedelta(days=90)  # Last 90 days

    params = {
        "resultsPerPage": 100,
        "pubStartDate": start_date.strftime("%Y-%m-%dT00:00:00.000Z"),
        "pubEndDate": end_date.strftime("%Y-%m-%dT00:00:00.000Z")
    }

    try:
        res = requests.get(NVD_BASE_URL, headers=headers, params=params, timeout=10)
        res.raise_for_status()
        data = res.json().get("vulnerabilities", [])
    except Exception as e:
        print("Error fetching CVEs:", e)
        return []

    telecom_cves = []

    for item in data:
        cve = item.get("cve", {})
        description = cve.get("descriptions", [{}])[0].get("value", "")
        title = cve.get("id", "Unknown CVE")
        published = cve.get("published", "")[:10]

       # print(f"→ {title}: {description[:80]}")  # Debug print for terminal 

        if is_telecom_related(description):
            telecom_cves.append({
                "name": title,
                "date": published,
                "source": "NVD",
                "keywords": extract_keywords(description)
            })

        if len(telecom_cves) >= limit:
            break

    return telecom_cves

# def fetch_filtered_cves(limit: int = 5):
#     """Fetch top recent CVEs (non-filtered)"""
#     headers = {"apiKey": NVD_API_KEY} if NVD_API_KEY else {}

#     # Required date window: last 30 days
#     end_date = datetime.utcnow()
#     start_date = end_date - timedelta(days=30)

#     params = {
#         "resultsPerPage": 20,
#         "pubStartDate": start_date.strftime("%Y-%m-%dT00:00:00.000Z"),
#         "pubEndDate": end_date.strftime("%Y-%m-%dT00:00:00.000Z")
#     }

#     try:
#         res = requests.get(NVD_BASE_URL, headers=headers, params=params, timeout=10)
#         res.raise_for_status()
#         data = res.json().get("vulnerabilities", [])
#     except Exception as e:
#         print("Error fetching CVEs:", e)
#         return []

#     recent_cves = []

#     for item in data:
#         cve = item.get("cve", {})
#         description = cve.get("descriptions", [{}])[0].get("value", "")
#         title = cve.get("id", "Unknown CVE")
#         published = cve.get("published", "")[:10]  # Trim time if present

#         recent_cves.append({
#             "name": title,
#             "date": published,
#             "source": "NVD",
#             "keywords": []
#         })

#         if len(recent_cves) >= limit:
#             break

#     return recent_cves