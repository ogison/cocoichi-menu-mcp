import { Server } from "npm:@modelcontextprotocol/sdk@1.5.0/server/index.js";
import { StdioServerTransport } from "npm:@modelcontextprotocol/sdk@1.5.0/server/stdio.js";
import {
  CallToolRequest,
  CallToolRequestSchema,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  Tool,
} from "npm:@modelcontextprotocol/sdk@1.5.0/types.js";
import {
  menuData,
  menuOptions,
  spiceLevels,
  type MenuCategory,
  type MenuItem,
} from "../data/menu.ts";

const TOOLS: Tool[] = [
  {
    name: "listMenu",
    description: "List all menu categories and items",
    inputSchema: { type: "object", properties: {}, required: [] },
  },
  {
    name: "getMenuItem",
    description: "Get details of a specific menu item",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "メニュー名" },
      },
      required: ["name"],
    },
  },
  {
    name: "searchMenuItems",
    description: "Search menu items by keyword or filters",
    inputSchema: {
      type: "object",
      properties: {
        keyword: {
          type: "string",
          description: "検索キーワード（例: チーズ）",
        },
        category: {
          type: "string",
          description: "カテゴリ名またはIDでのフィルタ",
        },
        priceMax: {
          type: "number",
          description: "最大価格",
        },
      },
      required: ["keyword"],
    },
  },
];

const server = new Server(
  {
    name: "cocoichi-menu-mcp",
    version: "0.1.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  },
);

server.setRequestHandler(ListResourcesRequestSchema, () => ({
  resources: [],
}));

server.setRequestHandler(ListToolsRequestSchema, () => ({ tools: TOOLS }));

const findMenuItemByName = (
  name: string,
): { category: MenuCategory; item: MenuItem } | null => {
  const normalized = name.trim().toLowerCase();
  for (const category of menuData) {
    for (const item of category.items) {
      const matchesJapanese = item.name.trim().toLowerCase() === normalized;
      const matchesEnglish =
        item.englishName?.trim().toLowerCase() === normalized;
      if (matchesJapanese || matchesEnglish) {
        return { category, item };
      }
    }
  }
  return null;
};

server.setRequestHandler(CallToolRequestSchema, (request: CallToolRequest) => {
  const name = request.params.name;
  const args = request.params.arguments ?? {};

  switch (name) {
    case "listMenu": {
      const categories = menuData.map((category) => ({
        name: category.name,
        items: category.items.map((item) => ({
          name: item.name,
          englishName: item.englishName,
          price: item.price,
          detailUrl: item.detailUrl,
        })),
      }));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ categories }, null, 2),
          },
        ],
        isError: false,
      };
    }

    case "getMenuItem": {
      const itemName = args.name;
      if (typeof itemName !== "string" || itemName.trim() === "") {
        return {
          content: [
            { type: "text", text: "Expected `name` to be a non-empty string" },
          ],
          isError: true,
        };
      }
      const match = findMenuItemByName(itemName);
      if (!match) {
        return {
          content: [
            { type: "text", text: `Menu item not found for name: ${itemName}` },
          ],
          isError: true,
        };
      }
      const payload = {
        name: match.item.name,
        category: match.category.name,
        price: match.item.price,
        englishName: match.item.englishName,
        detailUrl: match.item.detailUrl,
        spiceLevels,
        options: menuOptions,
      };
      return {
        content: [{ type: "text", text: JSON.stringify(payload, null, 2) }],
        isError: false,
      };
    }

    case "searchMenuItems": {
      const keyword = args.keyword;
      if (typeof keyword !== "string" || keyword.trim() === "") {
        return {
          content: [
            {
              type: "text",
              text: "Expected `keyword` to be a non-empty string",
            },
          ],
          isError: true,
        };
      }
      const categoryFilter =
        typeof args.category === "string" && args.category.trim() !== ""
          ? args.category.trim().toLowerCase()
          : undefined;
      const priceMax =
        typeof args.priceMax === "number" && Number.isFinite(args.priceMax)
          ? args.priceMax
          : undefined;
      const normalizedKeyword = keyword.trim().toLowerCase();

      const results = menuData
        .flatMap((category) =>
          category.items.map((item) => ({ category, item })),
        )
        .filter(({ category, item }) => {
          const matchesKeyword =
            item.name.toLowerCase().includes(normalizedKeyword) ||
            (item.englishName
              ? item.englishName.toLowerCase().includes(normalizedKeyword)
              : false);
          const matchesCategory = categoryFilter
            ? category.id.toLowerCase() === categoryFilter ||
              category.name.toLowerCase() === categoryFilter
            : true;
          const matchesPrice =
            priceMax !== undefined ? item.price <= priceMax : true;
          return matchesKeyword && matchesCategory && matchesPrice;
        })
        .map(({ category, item }) => ({
          name: item.name,
          englishName: item.englishName,
          category: category.name,
          price: item.price,
          detailUrl: item.detailUrl,
        }));

      const optionMatches = menuOptions
        .filter((option) => {
          const normalizedName = option.name.toLowerCase();
          const normalizedDescription = option.description.toLowerCase();
          return (
            normalizedName.includes(normalizedKeyword) ||
            normalizedDescription.includes(normalizedKeyword)
          );
        })
        .map((option) => ({
          id: option.id,
          name: option.name,
          description: option.description,
          priceDelta: option.priceDelta,
        }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ results, optionMatches }, null, 2),
          },
        ],
        isError: false,
      };
    }
    case "echoOk": {
      return {
        content: [{ type: "text", text: "OK" }],
        isError: false,
      };
    }
    default: {
      return {
        content: [
          {
            type: "text",
            text: `Unknown tool: ${name}`,
          },
        ],
        isError: true,
      };
    }
  }
});

await server.connect(new StdioServerTransport());
console.error("MCP server running on stdio");
