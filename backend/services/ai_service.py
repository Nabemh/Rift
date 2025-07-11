from db.session import engine
from agents.analysis_agent import AnalysisAgent
from agents.ai_assistant import AIAssistant
import pandas as pd

# Load DataFrame from PostgreSQL
def load_df():
    from os import getenv
    table = getenv("DB_TABLE")
    return pd.read_sql(f"SELECT * FROM {table}", engine)

# Create and cache the assistant globally
assistant: AIAssistant = None

def initialize_ai_assistant():
    global assistant
    df = load_df()
    analysis_agent = AnalysisAgent(df)
    insights = analysis_agent.run()
    assistant = AIAssistant(insights_data=insights)

def get_assistant() -> AIAssistant:
    if assistant is None:
        initialize_ai_assistant()
    return assistant
