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
  riceOptionPricing,
  sauceSelection,
  spiceLevels,
  toppings,
  type MenuCategory,
  type MenuItem,
  type RiceOptionPricing,
  type SpiceLevel,
  type Topping,
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
  {
    name: "suggestCombo",
    description:
      "Suggest a main curry and toppings combination that fits within a budget",
    inputSchema: {
      type: "object",
      properties: {
        budget: {
          type: "number",
          description: "Available budget in JPY",
        },
        preferences: {
          type: "object",
          description: "Optional preference settings",
          properties: {
            spice: {
              type: "number",
              description: "Preferred spice heat indicator (-1 for mild, 0-10)",
            },
            rice: {
              type: "number",
              description: "Preferred rice amount in grams (e.g. 300)",
            },
            toppings: {
              type: "array",
              description: "Desired topping keywords or IDs",
              items: { type: "string" },
            },
          },
        },
      },
      required: ["budget"],
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

const normalizeString = (value: string): string => value.trim().toLowerCase();

const parseSpiceIndicator = (level: SpiceLevel): number =>
  Number.parseInt(level.heatLevelIndicator, 10);

const determineRicePriceKey = (item: MenuItem): keyof RiceOptionPricing["priceByCurry"] => {
  const name = normalizeString(
    `${item.name} ${item.englishName ?? ""}`,
  );
  if (
    name.includes("ビーフ") ||
    name.includes("牛") ||
    name.includes("beef")
  ) {
    return "beefCurry";
  }
  if (
    name.includes("ベジ") ||
    name.includes("やさい") ||
    name.includes("vegetable") ||
    name.includes("vege")
  ) {
    return "vegeCurry";
  }
  return "porkCurry";
};

const parseRiceAmount = (option: RiceOptionPricing): number => {
  const match = option.amount.match(/\d+/);
  return match ? Number.parseInt(match[0], 10) : 300;
};

const generateToppingCombos = (candidates: Topping[]): Topping[][] => {
  const combos: Topping[][] = [];
  for (let i = 0; i < candidates.length; i++) {
    combos.push([candidates[i]]);
  }
  for (let i = 0; i < candidates.length; i++) {
    for (let j = i + 1; j < candidates.length; j++) {
      combos.push([candidates[i], candidates[j]]);
    }
  }
  return combos;
};

const buildJustification = (parts: string[]): string =>
  parts.filter((part) => part.trim().length > 0).join("、");

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
      const availableToppings = toppings.map((topping) => ({
        id: topping.id,
        name: topping.name,
        price: topping.price,
        description: topping.description,
        limitedTime: topping.limitedTime ?? false,
      }));
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                categories,
                riceOptionPricing,
                toppings: availableToppings,
                sauceSelection,
              },
              null,
              2,
            ),
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
        riceOptionPricing,
        sauceSelection,
        toppings,
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

      const toppingMatches = toppings
        .filter((topping) => {
          const normalizedName = topping.name.toLowerCase();
          const normalizedDescription = topping.description
            ? topping.description.toLowerCase()
            : "";
          const matchesLimitedTime =
            topping.limitedTime && normalizedKeyword === "期間限定";
          return (
            normalizedName.includes(normalizedKeyword) ||
            normalizedDescription.includes(normalizedKeyword) ||
            matchesLimitedTime
          );
        })
        .map((topping) => ({
          id: topping.id,
          name: topping.name,
          description: topping.description,
          price: topping.price,
          limitedTime: topping.limitedTime ?? false,
        }));

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              { results, optionMatches, toppingMatches, riceOptionPricing },
              null,
              2,
            ),
          },
        ],
        isError: false,
      };
    }
    case "suggestCombo": {
      const rawBudget = args.budget;
      if (
        typeof rawBudget !== "number" ||
        Number.isNaN(rawBudget) ||
        !Number.isFinite(rawBudget) ||
        rawBudget <= 0
      ) {
        return {
          content: [{
            type: "text",
            text: "Expected `budget` to be a positive number",
          }],
          isError: true,
        };
      }

      const budget = rawBudget;
      const preferences =
        typeof args.preferences === "object" && args.preferences !== null
          ? args.preferences as Record<string, unknown>
          : undefined;

      const preferredSpice = preferences?.spice;
      const preferredSpiceValue =
        typeof preferredSpice === "number" && Number.isFinite(preferredSpice)
          ? preferredSpice
          : undefined;

      const preferredRice = preferences?.rice;
      const preferredRiceAmount =
        typeof preferredRice === "number" && Number.isFinite(preferredRice)
          ? preferredRice
          : undefined;

      const preferredToppingsInput = Array.isArray(preferences?.toppings)
        ? preferences?.toppings as unknown[]
        : [];
      const preferredToppings = preferredToppingsInput
        .filter((value): value is string => typeof value === "string")
        .map((value) => normalizeString(value))
        .filter((value) => value.length > 0);

      const toppingPreferenceMap = new Map<string, boolean>();
      const candidateToppings = toppings
        .map((topping) => {
          const normalizedId = normalizeString(topping.id);
          const normalizedName = normalizeString(topping.name);
          const matched = preferredToppings.some((keyword) =>
            normalizedId === keyword || normalizedName.includes(keyword)
          );
          toppingPreferenceMap.set(topping.id, matched);
          return { topping, matched };
        })
        .sort((a, b) => {
          if (a.matched !== b.matched) {
            return a.matched ? -1 : 1;
          }
          return a.topping.price - b.topping.price;
        })
        .map((entry) => entry.topping)
        .slice(
          0,
          Math.min(
            toppings.length,
            preferredToppings.length > 0
              ? Math.max(5, preferredToppings.length)
              : 6,
          ),
        );

      const combos: {
        item: MenuItem;
        category: MenuCategory;
        toppings: Topping[];
        totalPrice: number;
        remainingBudget: number;
        score: number;
        scoreBreakdown: Record<string, number>;
        recommendedSpice: SpiceLevel;
        recommendedRice: {
          option: RiceOptionPricing;
          priceAdjustment: string;
          amount: number;
        };
        justification: string;
      }[] = [];

      const toppingCombos = generateToppingCombos(candidateToppings);

      const spiceLevelFallback = spiceLevels.find((level) => level.id === "standard") ??
        spiceLevels[0];

      for (const category of menuData) {
        for (const item of category.items) {
          const ricePriceKey = determineRicePriceKey(item);
          const riceWithDifferences = riceOptionPricing.map((option) => {
            const amount = parseRiceAmount(option);
            const priceAdjustment = option.priceByCurry[ricePriceKey];
            const difference = preferredRiceAmount !== undefined
              ? Math.abs(preferredRiceAmount - amount)
              : 0;
            return { option, amount, priceAdjustment, difference };
          }).sort((a, b) => a.difference - b.difference);

          const recommendedRice = riceWithDifferences[0] ?? {
            option: riceOptionPricing[0],
            amount: parseRiceAmount(riceOptionPricing[0]),
            priceAdjustment: riceOptionPricing[0].priceByCurry[ricePriceKey],
          };

          const recommendedSpice = preferredSpiceValue !== undefined
            ? spiceLevels.reduce((best, current) => {
              const bestDiff = Math.abs(
                preferredSpiceValue - parseSpiceIndicator(best),
              );
              const currentDiff = Math.abs(
                preferredSpiceValue - parseSpiceIndicator(current),
              );
              if (currentDiff < bestDiff) {
                return current;
              }
              if (currentDiff === bestDiff) {
                return parseSpiceIndicator(current) > parseSpiceIndicator(best)
                  ? current
                  : best;
              }
              return best;
            }, spiceLevelFallback)
            : spiceLevelFallback;

          const spicePrice = recommendedSpice.priceAdjustment;
          const spiceIndicator = parseSpiceIndicator(recommendedSpice);

          const baseQualityScore = Math.log(item.price) * 5;

          for (const toppingCombo of toppingCombos) {
            const toppingsCost = toppingCombo.reduce(
              (sum, topping) => sum + topping.price,
              0,
            );
            const comboPrice = item.price + toppingsCost + spicePrice;
            if (comboPrice > budget) {
              continue;
            }

            const priceUtilization = comboPrice / budget;
            const priceScore = priceUtilization * 40;
            const toppingScore = toppingCombo.reduce((sum, topping) => {
              const matched = toppingPreferenceMap.get(topping.id) ?? false;
              return sum + (matched ? 12 : 6);
            }, 0);

            const spiceScore = preferredSpiceValue !== undefined
              ? Math.max(0, 20 - Math.abs(preferredSpiceValue - spiceIndicator) * 5)
              : 10;

            const riceScore = preferredRiceAmount !== undefined
              ? Math.max(
                0,
                15 - Math.abs(preferredRiceAmount - recommendedRice.amount) / 50 * 5,
              )
              : 5;

            const totalScore =
              baseQualityScore + priceScore + toppingScore + spiceScore + riceScore;

            const justification = buildJustification([
              `予算の${Math.round(priceUtilization * 100)}%を活用`,
              toppingCombo.some((topping) => toppingPreferenceMap.get(topping.id))
                ? "希望トッピングを反映"
                : "バランスの良い定番トッピング",
              preferredSpiceValue !== undefined
                ? `${recommendedSpice.japaneseName}（辛さ指標 ${recommendedSpice.heatLevelIndicator}）`
                : "標準の辛さ",
              preferredRiceAmount !== undefined
                ? `${recommendedRice.option.amount}ライスを提案`
                : "標準ライス量を基準",
            ]);

            combos.push({
              item,
              category,
              toppings: toppingCombo,
              totalPrice: comboPrice,
              remainingBudget: budget - comboPrice,
              score: Number.parseFloat(totalScore.toFixed(2)),
              scoreBreakdown: {
                baseQuality: Number.parseFloat(baseQualityScore.toFixed(2)),
                price: Number.parseFloat(priceScore.toFixed(2)),
                toppings: Number.parseFloat(toppingScore.toFixed(2)),
                spice: Number.parseFloat(spiceScore.toFixed(2)),
                rice: Number.parseFloat(riceScore.toFixed(2)),
              },
              recommendedSpice,
              recommendedRice: {
                option: recommendedRice.option,
                priceAdjustment: recommendedRice.priceAdjustment,
                amount: recommendedRice.amount,
              },
              justification,
            });
          }
        }
      }

      const sorted = combos
        .sort((a, b) => b.score - a.score)
        .slice(0, 5)
        .map((combo) => ({
          main: {
            id: combo.item.id,
            name: combo.item.name,
            englishName: combo.item.englishName,
            category: combo.category.name,
            basePrice: combo.item.price,
          },
          toppings: combo.toppings.map((topping) => ({
            id: topping.id,
            name: topping.name,
            price: topping.price,
            preferredMatch: toppingPreferenceMap.get(topping.id) ?? false,
          })),
          recommendedSpice: {
            id: combo.recommendedSpice.id,
            japaneseName: combo.recommendedSpice.japaneseName,
            heatLevelIndicator: combo.recommendedSpice.heatLevelIndicator,
            priceAdjustment: combo.recommendedSpice.priceAdjustment,
          },
          recommendedRice: {
            id: combo.recommendedRice.option.id,
            amount: combo.recommendedRice.option.amount,
            description: combo.recommendedRice.option.description,
            priceAdjustment: combo.recommendedRice.priceAdjustment,
          },
          totalPrice: combo.totalPrice,
          remainingBudget: Number.parseFloat(combo.remainingBudget.toFixed(2)),
          score: combo.score,
          scoreBreakdown: combo.scoreBreakdown,
          justification: combo.justification,
        }));

      if (sorted.length === 0) {
        return {
          content: [{
            type: "text",
            text: "Unable to find a combination within the provided budget",
          }],
          isError: true,
        };
      }

      return {
        content: [{
          type: "text",
          text: JSON.stringify(
            {
              budget,
              currency: "JPY",
              recommendations: sorted,
            },
            null,
            2,
          ),
        }],
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
