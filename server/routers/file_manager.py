from fastapi import APIRouter, UploadFile, File, Depends, HTTPException, Request
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from database import get_db
from routers.auth import get_current_user, oauth2_scheme
import os
import shutil
import logging
import models

UPLOAD_DIRECTORY = "./uploaded_files/"
SHARED_DIRECTORY = "shared/"

router = APIRouter()

@router.post("/file-operations")
async def file_operations(request: Request, db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)):
    # Log the request headers to verify the token is sent
    logging.info(f"Request Headers: {request.headers}")

    # Try to get the current user using the token
    try:
        current_user = get_current_user(token, db)
        logging.info(f'Authenticated user: {current_user.full_name}')
    except HTTPException as e:
        logging.error(f"Authentication failed: {e.detail}")
        return JSONResponse(content={"error": "Authentication failed"}, status_code=e.status_code)

    # Process the request
    form = await request.json()
    action = form.get("action")
    
    logging.info(f'Action received: {action}')

    if action == "read":
        logging.info("Read action triggered")
        return {"action": "read", "files": []}  # Example response, replace with actual logic

    elif action == "upload":
        file: UploadFile = form.get("file")
        if file:
            user_directory = current_user.full_name.replace(" ", "")
            user_path = os.path.join(UPLOAD_DIRECTORY, user_directory)
            os.makedirs(user_path, exist_ok=True)

            file_path = os.path.join(user_path, file.filename)
            with open(file_path, "wb") as buffer:
                shutil.copyfileobj(file.file, buffer)
            
            logging.info(f'File uploaded: {file.filename}')
            return JSONResponse(content={"filename": file.filename})

    return JSONResponse(content={"error": "Invalid action"}, status_code=400)
