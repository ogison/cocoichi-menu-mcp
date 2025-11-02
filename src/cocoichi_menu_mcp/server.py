"""FastAPI application exposing the Coco Ichibanya menu via MCP endpoints."""

from __future__ import annotations

from functools import lru_cache
from typing import Optional

from fastapi import Depends, FastAPI, HTTPException, Query

from .menu_loader import MenuRepository, default_repository
from .models import MenuData, MenuItem


@lru_cache(maxsize=1)
def _app_repository() -> MenuRepository:
    return default_repository()


def get_repository() -> MenuRepository:
    """Dependency that returns the shared repository instance."""

    return _app_repository()


def create_app() -> FastAPI:
    """Create and configure the FastAPI application."""

    app = FastAPI(title="Coco Ichibanya Menu MCP", version="0.1.0")

    @app.get("/health", tags=["system"])
    def health_check() -> dict[str, str]:
        return {"status": "ok"}

    @app.get("/menu", response_model=MenuData, tags=["menu"])
    def get_full_menu(repo: MenuRepository = Depends(get_repository)) -> MenuData:
        return repo.get_menu()

    @app.get("/menu/items", response_model=list[MenuItem], tags=["menu"])
    def list_items(
        section: Optional[str] = Query(None, description="Only return items from this section"),
        name: Optional[str] = Query(None, description="Filter items by substring"),
        min_price: Optional[int] = Query(None, ge=0, description="Minimum price in yen"),
        max_price: Optional[int] = Query(None, ge=0, description="Maximum price in yen"),
        repo: MenuRepository = Depends(get_repository),
    ) -> list[MenuItem]:
        menu = repo.get_menu()
        results = menu.find_items(
            name_contains=name,
            section=section,
            min_price=min_price,
            max_price=max_price,
        )
        if not results:
            raise HTTPException(status_code=404, detail="No menu items matched the criteria")
        return results

    @app.get("/menu/sections/{section_name}", response_model=list[MenuItem], tags=["menu"])
    def get_section(section_name: str, repo: MenuRepository = Depends(get_repository)) -> list[MenuItem]:
        menu = repo.get_menu()
        section_items = menu.find_items(section=section_name)
        if not section_items:
            raise HTTPException(status_code=404, detail=f"Section '{section_name}' not found")
        return section_items

    return app


app = create_app()
