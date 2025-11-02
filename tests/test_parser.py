from pathlib import Path

from cocoichi_menu_mcp.menu_loader import MenuConfig, MenuRepository


def test_parse_pdf(tmp_path: Path) -> None:
    pdf_path = Path(__file__).resolve().parents[1] / "data" / "menubook_regular.pdf"
    cache_path = tmp_path / "cache.json"
    repo = MenuRepository(MenuConfig(pdf_path=pdf_path, cache_path=cache_path))

    menu = repo.get_menu()

    assert menu.title == "Coco Ichibanya Menu"
    sections = {section.name: section for section in menu.sections}
    assert "Curries" in sections
    assert any(item.name == "Pork Curry" and item.price == 500 for item in sections["Curries"].items)

    # Cache file should be created
    assert cache_path.exists()
