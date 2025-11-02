"""Pydantic models for Coco Ichibanya menu data."""

from __future__ import annotations

from typing import List, Optional

from pydantic import BaseModel, Field


class MenuItem(BaseModel):
    """Represents a menu item that can be ordered."""

    name: str = Field(..., description="Display name of the menu item")
    description: str = Field(..., description="Short description of the item")
    price: int = Field(..., description="Price in yen")
    section: str = Field(..., description="Section/category the item belongs to")


class MenuSection(BaseModel):
    """Group of menu items belonging to a section."""

    name: str
    items: List[MenuItem]


class MenuData(BaseModel):
    """Full menu representation."""

    title: str
    sections: List[MenuSection]

    def find_items(
        self,
        *,
        name_contains: Optional[str] = None,
        section: Optional[str] = None,
        max_price: Optional[int] = None,
        min_price: Optional[int] = None,
    ) -> List[MenuItem]:
        """Return menu items filtered by the provided constraints."""

        items = [item for section_model in self.sections for item in section_model.items]
        if name_contains:
            needle = name_contains.lower()
            items = [item for item in items if needle in item.name.lower()]
        if section:
            needle = section.lower()
            items = [item for item in items if item.section.lower() == needle]
        if max_price is not None:
            items = [item for item in items if item.price <= max_price]
        if min_price is not None:
            items = [item for item in items if item.price >= min_price]
        return items
