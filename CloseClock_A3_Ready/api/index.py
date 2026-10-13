"""CloseClock Python API. All task requests validate Firebase ID tokens."""

import os
from datetime import date
from typing import Optional
from uuid import UUID

import httpx
import jwt
from jwt import PyJWKClient
from dotenv import load_dotenv

from fastapi import Depends, FastAPI, HTTPException, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field


load_dotenv()

app = FastAPI(title="CloseClock API")


# CORS configuration (allows React frontend to communicate with FastAPI)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


jwks = PyJWKClient(
    "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com",
    cache_jwk_set=True,
    lifespan=3600
)


class TaskCreate(BaseModel):
    text: str = Field(min_length=1, max_length=300)
    priority: str = Field(
        default="Medium",
        pattern="^(High|Medium|Low)$"
    )
    category: str = Field(
        default="Study",
        pattern="^(Study|Work|Personal)$"
    )
    deadline: Optional[date] = None


class TaskUpdate(BaseModel):
    text: Optional[str] = Field(
        default=None,
        min_length=1,
        max_length=300
    )
    priority: Optional[str] = Field(
        default=None,
        pattern="^(High|Medium|Low)$"
    )
    category: Optional[str] = Field(
        default=None,
        pattern="^(Study|Work|Personal)$"
    )
    deadline: Optional[date] = None
    completed: Optional[bool] = None



def current_user(
    authorization: str = Header(default="")
) -> str:

    project = os.getenv("FIREBASE_PROJECT_ID", "").strip()

    if not project:
        raise HTTPException(
            500,
            "FIREBASE_PROJECT_ID not configured"
        )

    if not authorization.startswith("Bearer "):
        raise HTTPException(
            401,
            "Login required"
        )

    try:
        token = authorization[7:]

        signing_key = jwks.get_signing_key_from_jwt(token).key

        claims = jwt.decode(
            token,
            signing_key,
            algorithms=["RS256"],
            audience=project,
            issuer=f"https://securetoken.google.com/{project}",
            options={
                "require": [
                    "exp",
                    "iat",
                    "sub",
                    "aud",
                    "iss"
                ]
            }
        )

        if not claims.get("sub"):
            raise ValueError("Missing user ID")

        return claims["sub"]

    except Exception:
        raise HTTPException(
            401,
            "Invalid or expired login. Please log in again."
        )



async def db_request(
    method: str,
    path: str = "",
    *,
    params=None,
    json_data=None,
    prefer=None
):

    url = os.getenv("SUPABASE_URL", "").rstrip("/")
    key = os.getenv("SUPABASE_SERVICE_ROLE_KEY", "")

    if not url or not key:
        raise HTTPException(
            500,
            "Supabase environment variables are missing"
        )

    headers = {
        "apikey": key,
        "Authorization": f"Bearer {key}",
        "Content-Type": "application/json"
    }

    if prefer:
        headers["Prefer"] = prefer

    try:

        async with httpx.AsyncClient(timeout=15) as client:

            response = await client.request(
                method,
                f"{url}/rest/v1/tasks{path}",
                params=params,
                json=json_data,
                headers=headers
            )

        response.raise_for_status()

        return response.json() if response.content else None


    except httpx.HTTPStatusError as e:

        raise HTTPException(
            502,
            "Database request failed (check table and configuration)"
        ) from e


    except httpx.RequestError as e:

        raise HTTPException(
            502,
            "Supabase unreachable"
        ) from e



@app.get("/api/health")
async def health():

    return {
        "status": "ok",
        "service": "CloseClock Python backend"
    }



@app.get("/api/tasks")
async def list_tasks(
    uid: str = Depends(current_user)
):

    return await db_request(
        "GET",
        params={
            "select": "*",
            "firebase_uid": f"eq.{uid}",
            "order": "created_at.asc"
        }
    )



@app.post("/api/tasks", status_code=201)
async def create_task(
    task: TaskCreate,
    uid: str = Depends(current_user)
):

    data = task.model_dump(mode="json")

    data.update(
        firebase_uid=uid,
        completed=False
    )

    rows = await db_request(
        "POST",
        json_data=data,
        prefer="return=representation"
    )

    return rows[0]



@app.patch("/api/tasks/{task_id}")
async def patch_task(
    task_id: UUID,
    task: TaskUpdate,
    uid: str = Depends(current_user)
):

    changes = task.model_dump(
        mode="json",
        exclude_unset=True
    )

    if not changes:
        raise HTTPException(
            400,
            "No changes supplied"
        )

    rows = await db_request(
        "PATCH",
        params={
            "id": f"eq.{task_id}",
            "firebase_uid": f"eq.{uid}"
        },
        json_data=changes,
        prefer="return=representation"
    )

    if not rows:
        raise HTTPException(
            404,
            "Task not found"
        )

    return rows[0]



@app.delete("/api/tasks/{task_id}", status_code=204)
async def remove_task(
    task_id: UUID,
    uid: str = Depends(current_user)
):

    await db_request(
        "DELETE",
        params={
            "id": f"eq.{task_id}",
            "firebase_uid": f"eq.{uid}"
        }
    )

    return None
    