import logging
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import models
from database import engine
from routers import auth, file_manager, user

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Ensure the database tables are created
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Middleware to log incoming requests
@app.middleware("http")
async def log_requests(request: Request, call_next):
    logger.info(f"Request URL: {request.url}")
    logger.info(f"Request Headers: {request.headers}")
    response = await call_next(request)
    return response

# Include Routers
app.include_router(auth.router)
app.include_router(file_manager.router)
app.include_router(user.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
