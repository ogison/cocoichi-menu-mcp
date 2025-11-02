from fastapi.testclient import TestClient

from cocoichi_menu_mcp.server import create_app


client = TestClient(create_app())


def test_health_endpoint() -> None:
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok"}


def test_menu_listing() -> None:
    response = client.get("/menu")
    assert response.status_code == 200
    payload = response.json()
    assert payload["title"] == "Coco Ichibanya Menu"
    assert any(section["name"] == "Curries" for section in payload["sections"])


def test_item_search_filters() -> None:
    response = client.get("/menu/items", params={"section": "Curries", "max_price": 550})
    assert response.status_code == 200
    items = response.json()
    assert all(item["section"].lower() == "curries" for item in items)
    assert all(item["price"] <= 550 for item in items)


def test_section_lookup_not_found() -> None:
    response = client.get("/menu/sections/Unknown")
    assert response.status_code == 404
