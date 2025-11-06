export type Sauce = {
  id: string;
  name: string;
  description: string;
  priceDelta: number;
};

export type SauceSelection = Sauce[];

export const sauceSelection: SauceSelection = [
  {
    id: "pork-sauce",
    name: "ポークソース",
    description:
      "変わらないおいしさのココイチの基本となるソースです。甘口もできます。",
    priceDelta: 0,
  },
  {
    id: "beef-sauce",
    name: "ビーフソース",
    description:
      "ビーフの旨みが凝縮された“もうひとつの定番ソース”。",
    priceDelta: 148,
  },
  {
    id: "cocoichi-veg-sauce",
    name: "ココイチベジソース",
    description: "動物由来の原材料を使用していないソースです。",
    priceDelta: 37,
  },
];
