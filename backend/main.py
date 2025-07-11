from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.routing import APIRouter
from contextlib import asynccontextmanager

from api.endpoints import router as api_router
from api.ai_chat import router as ai_chat_router
from services.ai_service import initialize_ai_assistant

@asynccontextmanager
async def lifespan(app: FastAPI):
    # This runs before the app starts
    initialize_ai_assistant()
    yield
    # You can also add cleanup logic here if needed
    # (e.g. closing DB connections, saving cache)

app = FastAPI(title="CTI Dashboard API", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routes
app.include_router(api_router, prefix="/api")
app.include_router(ai_chat_router, prefix="/chat")
