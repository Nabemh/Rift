from fastapi import APIRouter, Query
from services.ai_service import get_assistant, initialize_ai_assistant
from pydantic import BaseModel

router = APIRouter()

class QueryRequest(BaseModel):
    query: str

@router.post("/ask")
async def ask_chatbot(request: QueryRequest):
    assistant = get_assistant()
    response = await assistant.process_query(request.query)
    return {"response": response}

@router.get("/insights")
def get_loaded_insights():
    assistant = get_assistant()
    return assistant.insights_data

@router.post("/reload")
def reload_insights():
    initialize_ai_assistant()
    return {"status": "AI Assistant reloaded with latest insights."}

