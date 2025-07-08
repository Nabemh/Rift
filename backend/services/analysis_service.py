import pandas as pd
from sqlalchemy import text
from db.session import engine
from agents.analysis_agent import AnalysisAgent
import os
from dotenv import load_dotenv

load_dotenv()

TABLE = os.getenv("DB_TABLE")

def get_threat_summary():
    with engine.connect() as connection:
        df = pd.read_sql(text(f"SELECT * FROM {TABLE}"), connection)
        agent = AnalysisAgent(df)
        insights = agent.run()
        return insights
