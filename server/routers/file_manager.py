from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import JSONResponse, FileResponse
import shutil
import os
from sqlalchemy.orm import Session
import models
import schemas
from database import get_db
from routers.auth import get_current_user

UPLOAD_DIRECTORY = "./uploaded_files/"
SHARED_DIRECTORY = "shared/"

router = APIRouter()

@router.post("/upload/")
async def upload_file(file: UploadFile = File(...), current_user: models.User = Depends(get_current_user)):
    user_directory = current_user.full_name.replace(" ", "")
    user_path = os.path.join(UPLOAD_DIRECTORY, user_directory)
    os.makedirs(user_path, exist_ok=True)

    file_path = os.path.join(user_path, file.filename)
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    return JSONResponse(content={"filename": file.filename})

@router.get("/files/")
async def list_files(current_user: models.User = Depends(get_current_user)):
    user_directory = current_user.full_name.replace(" ", "")
    user_path = os.path.join(UPLOAD_DIRECTORY, user_directory)
    shared_path = os.path.join(UPLOAD_DIRECTORY, SHARED_DIRECTORY)

    user_files = os.listdir(user_path) if os.path.exists(user_path) else []
    shared_files = os.listdir(shared_path) if os.path.exists(shared_path) else []

    return {"user_files": user_files, "shared_files": shared_files}

@router.get("/download/{file_name}")
async def download_file(file_name: str, current_user: models.User = Depends(get_current_user)):
    user_directory = current_user.full_name.replace(" ", "")
    file_path = os.path.join(UPLOAD_DIRECTORY, user_directory, file_name)

    if not os.path.exists(file_path):
        raise HTTPException(status_code=404, detail="File not found")
    
    return FileResponse(path=file_path, filename=file_name)

@router.get("/shared-files/")
async def list_shared_files():
    shared_path = os.path.join(UPLOAD_DIRECTORY, SHARED_DIRECTORY)
    shared_files = os.listdir(shared_path) if os.path.exists(shared_path) else []
    return {"shared_files": shared_files}
