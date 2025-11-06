export type MenuOption = {
  id: string;
  name: string;
  description: string;
  priceDelta: number;
};

export type RiceOptionPricing = {
  id: string;
  amount: string;
  description: string;
  priceByCurry: {
    porkCurry: string;
    vegeCurry: string;
    beefCurry: string;
  };
};

export const riceOptionPricing: RiceOptionPricing[] = [
  {
    id: "rice-150g",
    amount: "150g",
    description: "ハーフサイズ（標準より150g少なめ）",
    priceByCurry: {
      porkCurry: "90円引",
      vegeCurry: "90円引",
      beefCurry: "90円引",
    },
  },
  {
    id: "rice-200g",
    amount: "200g",
    description: "小盛り（標準より100g少なめ）",
    priceByCurry: {
      porkCurry: "60円引",
      vegeCurry: "60円引",
      beefCurry: "60円引",
    },
  },
  {
    id: "rice-250g",
    amount: "250g",
    description: "標準より50g少なめ",
    priceByCurry: {
      porkCurry: "30円引",
      vegeCurry: "30円引",
      beefCurry: "30円引",
    },
  },
  {
    id: "rice-300g",
    amount: "300g",
    description: "標準ライス量",
    priceByCurry: {
      porkCurry: "メニュー価格",
      vegeCurry: "メニュー価格",
      beefCurry: "メニュー価格",
    },
  },
  {
    id: "rice-350g",
    amount: "350g",
    description: "ライスを50g増量",
    priceByCurry: {
      porkCurry: "65円増",
      vegeCurry: "65円増",
      beefCurry: "78円増",
    },
  },
  {
    id: "rice-400g",
    amount: "400g",
    description: "ライスを100g増量",
    priceByCurry: {
      porkCurry: "130円増",
      vegeCurry: "130円増",
      beefCurry: "157円増",
    },
  },
  {
    id: "rice-500g",
    amount: "500g",
    description: "ライスを200g増量",
    priceByCurry: {
      porkCurry: "260円増",
      vegeCurry: "260円増",
      beefCurry: "314円増",
    },
  },
  {
    id: "rice-600g",
    amount: "600g",
    description: "ライスを300g増量",
    priceByCurry: {
      porkCurry: "390円増",
      vegeCurry: "390円増",
      beefCurry: "471円増",
    },
  },
];

export const menuOptions: MenuOption[] = [
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
