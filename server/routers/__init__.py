# routers/__init__.py
from .auth import router as auth_router
from .file_manager import router as file_manager_router
from .user import router as user_router

__all__ = ["auth_router", "file_manager_router", "user_router"]
