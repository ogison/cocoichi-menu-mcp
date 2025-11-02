"""FastMCPServer that exposes a static CocoICHI menu resource."""

from __future__ import annotations

import logging
from textwrap import dedent

from modelcontextprotocol.server.fastmcp import FastMCPServer

logger = logging.getLogger(__name__)

server = FastMCPServer("cocoichi-menu", "CocoICHI Menu Server")

MENU_TEXT = dedent(
    """
    CocoICHI Menu
    =============

    - Pork Cutlet Curry .......... 890 JPY
    - Chicken Katsu Curry ........ 860 JPY
    - Beef Curry ................. 820 JPY
    - Vegetable Curry ............ 780 JPY
    - Cheese Curry ............... 840 JPY

    Customize with your preferred spiciness and rice portion size!
    """
).strip()


@server.resource(
    "menu",
    name="CocoICHI Menu",
    description="Text representation of the CocoICHI curry menu.",
    mime_types=["text/plain"],
)
async def get_menu() -> str:
    """Return the static menu text resource."""
    logger.info("Providing CocoICHI menu resource")
    return MENU_TEXT


def main() -> None:
    """Start the FastMCP server."""
    logging.basicConfig(level=logging.INFO)
    server.run()


if __name__ == "__main__":
    main()
