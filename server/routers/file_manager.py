from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import JSONResponse
import shutil
import os
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from routers.auth import get_current_user  # Import get_current_user if it is defined in auth.py

UPLOAD_DIRECTORY = "./uploaded_files/"
SHARED_DIRECTORY = "shared/"

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...), current_user: dict = Depends(get_current_user)):
    user_directory = current_user['full_name'].replace(" ", "")
    user_path = os.path.join(UPLOAD_DIRECTORY, user_directory)
    os.makedirs(user_path, exist_ok=True)

    with open(f"{user_path}/{file.filename}", "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return JSONResponse(content={"filename": file.filename})

@router.get("/files/")
async def list_files(current_user: dict = Depends(get_current_user)):
    user_directory = current_user['full_name'].replace(" ", "")
    user_path = os.path.join(UPLOAD_DIRECTORY, user_directory)
    shared_path = os.path.join(UPLOAD_DIRECTORY, SHARED_DIRECTORY)

    user_files = os.listdir(user_path) if os.path.exists(user_path) else []
    shared_files = os.listdir(shared_path) if os.path.exists(shared_path) else []

    return {"user_files": user_files, "shared_files": shared_files}
