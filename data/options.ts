export type MenuOption = {
  id: string;
  name: string;
  description: string;
  priceDelta: number;
};

export const menuOptions: MenuOption[] = [
  {
    id: "rice-200g",
    name: "ライス 200g",
    description: "小盛り（標準より100g少なめ）",
    priceDelta: -51,
  },
  {
    id: "rice-300g",
    name: "ライス 300g",
    description: "標準ライス量",
    priceDelta: 0,
  },
  {
    id: "rice-400g",
    name: "ライス 400g",
    description: "ライスを100g増量",
    priceDelta: 102,
  },
  {
    id: "rice-500g",
    name: "ライス 500g",
    description: "ライスを200g増量",
    priceDelta: 204,
  },
  {
    id: "extra-sauce-15",
    name: "ルー 1.5倍",
    description: "カレーソースを1.5倍に増量",
    priceDelta: 77,
  },
  {
    id: "extra-sauce-20",
    name: "ルー 2倍",
    description: "カレーソースを2倍に増量",
    priceDelta: 154,
  },
  {
    id: "tobikara",
    name: "とび辛スパイス",
    description: "辛味パウダーを追いがけ（テーブル提供、追加料金なし）",
    priceDelta: 0,
  },
];
