"""Utilities for loading and caching Coco Ichibanya menu data."""

from __future__ import annotations

import json
import threading
from dataclasses import dataclass
from pathlib import Path
from typing import Optional

from pdfminer.high_level import extract_text

from .models import MenuData, MenuItem, MenuSection


@dataclass(slots=True)
class MenuConfig:
    """Configuration describing where menu assets live."""

    pdf_path: Path
    cache_path: Optional[Path] = None


class MenuRepository:
    """Load and cache the Coco Ichibanya menu from the PDF source."""

    def __init__(self, config: MenuConfig) -> None:
        self._config = config
        self._lock = threading.RLock()
        self._cached_data: Optional[MenuData] = None
        self._cached_mtime: Optional[float] = None

    def get_menu(self) -> MenuData:
        """Return the parsed menu, refreshing the cache if necessary."""

        with self._lock:
            pdf_mtime = self._config.pdf_path.stat().st_mtime
            if self._cached_data is not None and self._cached_mtime == pdf_mtime:
                return self._cached_data

            menu = self._load_from_cache(pdf_mtime)
            if menu is None:
                menu = self._parse_pdf()
                self._write_cache(menu, pdf_mtime)

            self._cached_data = menu
            self._cached_mtime = pdf_mtime
            return menu

    def _load_from_cache(self, pdf_mtime: float) -> Optional[MenuData]:
        cache_path = self._config.cache_path
        if not cache_path or not cache_path.exists():
            return None
        try:
            with cache_path.open("r", encoding="utf-8") as handle:
                payload = json.load(handle)
        except (OSError, json.JSONDecodeError):
            return None
        if payload.get("pdf_mtime") != pdf_mtime:
            return None
        return MenuData.model_validate(payload["menu"])

    def _write_cache(self, menu: MenuData, pdf_mtime: float) -> None:
        cache_path = self._config.cache_path
        if not cache_path:
            return
        cache_path.parent.mkdir(parents=True, exist_ok=True)
        payload = {"pdf_mtime": pdf_mtime, "menu": menu.model_dump()}
        try:
            with cache_path.open("w", encoding="utf-8") as handle:
                json.dump(payload, handle, ensure_ascii=False, indent=2)
        except OSError:
            # Failing to write the cache should not be fatal.
            pass

    def _parse_pdf(self) -> MenuData:
        text = extract_text(str(self._config.pdf_path))
        lines = [line.strip() for line in text.splitlines() if line.strip()]
        if not lines:
            raise ValueError("No content extracted from menu PDF")

        title = lines[0]
        sections: list[MenuSection] = []
        current_section: Optional[MenuSection] = None

        for line in lines[1:]:
            if line.lower().startswith("section:"):
                section_name = line.split(":", 1)[1].strip()
                current_section = MenuSection(name=section_name, items=[])
                sections.append(current_section)
                continue
            parts = [part.strip() for part in line.split(";")]
            if len(parts) != 3:
                # Skip lines we cannot parse
                continue
            name, description, price_str = parts
            try:
                price = int(price_str)
            except ValueError:
                continue
            if current_section is None:
                # If the PDF is missing a section header, drop the item.
                continue
            current_section.items.append(
                MenuItem(name=name, description=description, price=price, section=current_section.name)
            )

        if not sections:
            raise ValueError("No sections discovered in menu PDF")

        return MenuData(title=title, sections=sections)


def default_repository() -> MenuRepository:
    """Create a repository using the project data directory."""

    package_root = Path(__file__).resolve().parent.parent
    pdf_path = package_root.parent / "data" / "menubook_regular.pdf"
    cache_path = package_root.parent / "data" / "menubook_regular.json"
    config = MenuConfig(pdf_path=pdf_path, cache_path=cache_path)
    return MenuRepository(config)


__all__ = ["MenuRepository", "MenuConfig", "default_repository"]
