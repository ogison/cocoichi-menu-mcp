import { Server } from "@modelcontextprotocol/sdk/server";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/stdio";

const MENU_TEXT = `CocoICHI Menu
=============

- Pork Cutlet Curry .......... 890 JPY
- Chicken Katsu Curry ........ 860 JPY
- Beef Curry ................. 820 JPY
- Vegetable Curry ............ 780 JPY
- Cheese Curry ............... 840 JPY

Customize with your preferred spiciness and rice portion size!`;

const MENU_RESOURCE = {
  uri: "cocoichi-menu:menu",
  name: "CocoICHI Menu",
  description: "Text representation of the CocoICHI curry menu.",
  mimeType: "text/plain",
};

async function main() {
  const server = new Server({
    name: "cocoichi-menu",
    version: "0.1.0",
  });

  server.setRequestHandler("resources/list", async () => ({
    resources: [MENU_RESOURCE],
  }));

  server.setRequestHandler("resources/read", async ({ uri }) => {
    if (uri !== MENU_RESOURCE.uri) {
      throw new Error(`Unknown resource URI: ${uri}`);
    }

    return {
      contents: [
        {
          uri: MENU_RESOURCE.uri,
          mimeType: MENU_RESOURCE.mimeType,
          text: MENU_TEXT,
        },
      ],
    };
  });

  const transport = new StdioServerTransport();
  await server.connect(transport);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
