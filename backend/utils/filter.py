# TELECOM_KEYWORDS = [
#     "telecom", "lte", "5g", "4g", "3g", "voip", "sip", "cisco"
#     "ims", "bsc", "hlr", "ss7", "diameter", "carrier", "network provider"
#     "mobile core", "ericsson", "nokia", "zte", "huawei", "telecommunications"
#     "router", "base station", "infrastructure", "isp", "network"
# ]

TELECOM_KEYWORDS = [
    "telecom", "lte", "5g", "4g", "3g", "voip", "sip", "ims",
    "bts", "antenna", "carrier", "infrastructure",
    "core network", "router", "modem", "network equipment",
    "network interface", "radio", "fiber", "transmission",
    "huawei", "ericsson", "nokia", "zte", "cellular", "operator"
]


# def is_telecom_related(text: str) -> bool:
#     """Returns True if the text contains telecom-related keywords."""
#     if not text:
#         return False
#     text_lower = text.lower()
#     return any(keyword in text_lower for keyword in TELECOM_KEYWORDS)

def is_telecom_related(text: str) -> bool:
    return text and any(kw in text.lower() for kw in TELECOM_KEYWORDS)


def extract_keywords(text: str, max_keywords: int = 2) -> list:
    """Extracts up to `max_keywords` matching telecom-related keywords from the text."""
    text_lower = text.lower()
    matches = [kw for kw in TELECOM_KEYWORDS if kw in text_lower]
    return list(dict.fromkeys(matches))[:max_keywords]  # Remove duplicates, preserve order
