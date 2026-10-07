"""
NeuroScreen AI - FastAPI Application Server
Entrypoint for Python backend service.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import os

from backend.api.routes import router as screening_router

app = FastAPI(
    title="NeuroScreen AI API",
    description="Multimodal Neuromuscular Risk Screening and Explainable AI Service",
    version="0.1.0-alpha",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# Enable CORS for local and web clients
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(screening_router)

if __name__ == "__main__":
    import uvicorn
    port = int(os.environ.get("PORT", 8000))
    uvicorn.run("backend.main:app", host="0.0.0.0", port=port, reload=True)
