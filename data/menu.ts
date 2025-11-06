export type MenuItem = {
  id: string;
  name: string;
  englishName: string | null;
  price: number;
  detailUrl: string;
};

export type MenuCategory = {
  id: string;
  name: string;
  items: MenuItem[];
};

export const menuData: MenuCategory[] = [
  {
    id: "1",
    name: "肉類のカレー",
    items: [
      {
        id: "1293",
        name: "ポークカレー",
        englishName: "Pork curry",
        price: 646,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1293",
      },
      {
        id: "1294",
        name: "甘口ポークカレー",
        englishName: "Mild pork curry",
        price: 646,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1294",
      },
      {
        id: "1307",
        name: "ビーフカレー",
        englishName: "Beef curry",
        price: 794,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1307",
      },
      {
        id: "1617",
        name: "チキンにこみカレー",
        englishName: "Stewed chicken curry",
        price: 934,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1617",
      },
      {
        id: "1782",
        name: "フライドチキン(5個)カレー",
        englishName: "Fried chicken (5 pieces) curry",
        price: 951,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1782",
      },
      {
        id: "1301",
        name: "ハンバーグ(2個)カレー",
        englishName: "Hamburger (2 pieces) curry",
        price: 976,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1301",
      },
      {
        id: "1303",
        name: "豚しゃぶカレー",
        englishName: "Thin-sliced pork curry",
        price: 982,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1303",
      },
      {
        id: "1302",
        name: "メンチカツカレー",
        englishName: "Minced meat cutlet curry",
        price: 972,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1302",
      },
      {
        id: "1300",
        name: "ソーセージ(4本)カレー",
        englishName: "Sausage (4 pieces) curry",
        price: 994,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1300",
      },
      {
        id: "1299",
        name: "チキンカツカレー",
        englishName: "Chicken cutlet curry",
        price: 994,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1299",
      },
      {
        id: "1298",
        name: "パリパリチキンカレー",
        englishName: "Lightly crisped chicken curry",
        price: 994,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1298",
      },
      {
        id: "1297",
        name: "ロースカツカレー",
        englishName: "Pork cutlet curry",
        price: 998,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1297",
      },
      {
        id: "1618",
        name: "手仕込とんかつカレー",
        englishName: "Hand‐made“Tonkatsu”curry",
        price: 1192,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1618",
      },
      {
        id: "1800",
        name: "牛すじ煮込みカレー",
        englishName: "Gyu-suji nikomi (Stewed beef tendon) curry",
        price: 1132,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1800",
      },
    ],
  },
  {
    id: "4",
    name: "野菜類のカレー",
    items: [
      {
        id: "1780",
        name: "なす(6個)カレー",
        englishName: "Eggplant (6 pieces) curry",
        price: 826,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1780",
      },
      {
        id: "1315",
        name: "ほうれん草カレー",
        englishName: "Spinach curry",
        price: 898,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1315",
      },
      {
        id: "1316",
        name: "やさいカレー",
        englishName: "Vegetable curry",
        price: 918,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1316",
      },
    ],
  },
  {
    id: "5",
    name: "その他のカレーメニュー",
    items: [
      {
        id: "1838",
        name: "とろ～りたまフライカレー",
        englishName: null,
        price: 845,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1838",
      },
      {
        id: "1327",
        name: "ココイチベジカレー",
        englishName: "CoCoICHI vegetarian curry",
        price: 683,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1327",
      },
      {
        id: "1676",
        name: "オムカレー",
        englishName: "Runny omelet curry",
        price: 779,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1676",
      },
      {
        id: "1325",
        name: "低糖質カレー",
        englishName: "Low carb curry",
        price: 725,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1325",
      },
      {
        id: "1324",
        name: "納豆カレー",
        englishName: "Natto (fermented soy beans)curry",
        price: 813,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1324",
      },
      {
        id: "1323",
        name: "スクランブルエッグカレー",
        englishName: "Scrambled egg curry",
        price: 866,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1323",
      },
      {
        id: "1322",
        name: "チーズカレー",
        englishName: "Cheese curry",
        price: 910,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1322",
      },
      {
        id: "1781",
        name: "クリームコロッケ(カニ入り）(2個)カレー",
        englishName: "Cream croquette (with crab) (2 pieces) curry",
        price: 888,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1781",
      },
      {
        id: "1320",
        name: "きのこカレー",
        englishName: "Mushroom curry",
        price: 888,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1320",
      },
      {
        id: "1319",
        name: "なすとほうれん草のカレードリア",
        englishName: "Eggplant & spinach curry rice casserole",
        price: 817,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1319",
      },
      {
        id: "1318",
        name: "ハンバーグカレードリア",
        englishName: "Hamburger curry rice casserole",
        price: 817,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1318",
      },
    ],
  },
  {
    id: "3",
    name: "魚介類のカレー",
    items: [
      {
        id: "1314",
        name: "フィッシュフライ(2本)カレー",
        englishName: "Fried fish (2 pieces) curry",
        price: 858,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1314",
      },
      {
        id: "1313",
        name: "たっぷりあさりカレー",
        englishName: "Full of Asari clam curry",
        price: 858,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1313",
      },
      {
        id: "1312",
        name: "イカカレー",
        englishName: "Squid curry",
        price: 910,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1312",
      },
      {
        id: "1311",
        name: "エビにこみカレー",
        englishName: "Stewed shrimp curry",
        price: 910,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1311",
      },
      {
        id: "1779",
        name: "エビあさりカレー",
        englishName: "Shrimp and Asari clam curry",
        price: 884,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1779",
      },
      {
        id: "1310",
        name: "海の幸カレー",
        englishName: "Seafood curry",
        price: 1016,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1310",
      },
    ],
  },
  {
    id: "24",
    name: "ハヤシライス",
    items: [
      {
        id: "1853",
        name: "ハヤシライス",
        englishName: "Hashed beef and rice",
        price: 896,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1853",
      },
    ],
  },
  {
    id: "23",
    name: "ハーフカレー",
    items: [
      {
        id: "1833",
        name: "ハーフポークカレー",
        englishName: null,
        price: 556,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1833",
      },
      {
        id: "1832",
        name: "ハーフビーフカレー",
        englishName: null,
        price: 704,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1832",
      },
      {
        id: "1831",
        name: "ハーフココイチベジカレー",
        englishName: null,
        price: 593,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1831",
      },
      {
        id: "1830",
        name: "ハーフハヤシライス",
        englishName: null,
        price: 806,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1830",
      },
      {
        id: "1829",
        name: "ハーフポークカレー＋ハーフエビにこみ",
        englishName: null,
        price: 688,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1829",
      },
      {
        id: "1828",
        name: "ハーフポークカレー＋ハーフスクランブルエッグ",
        englishName: null,
        price: 666,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1828",
      },
      {
        id: "1826",
        name: "ハーフポークカレー＋クリームコロッケ(カニ入り)(1個)",
        englishName: null,
        price: 677,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1826",
      },
      {
        id: "1033",
        name: "ハーフポークカレー＋ハーフやさい",
        englishName: null,
        price: 692,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1033",
      },
      {
        id: "1843",
        name: "ハーフポークカレー＋ハーフほうれん草",
        englishName: null,
        price: 682,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1843",
      },
      {
        id: "1844",
        name: "ハーフポークカレー＋フライドチキン(3個)",
        englishName: null,
        price: 739,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1844",
      },
      {
        id: "1845",
        name: "ハーフポークカレー＋ハーフきのこ",
        englishName: null,
        price: 677,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1845",
      },
      {
        id: "1846",
        name: "ハーフポークカレー＋ハーフチーズ",
        englishName: null,
        price: 688,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1846",
      },
      {
        id: "1847",
        name: "ハーフポークカレー＋ハンバーグ（1個）",
        englishName: null,
        price: 721,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1847",
      },
      {
        id: "1848",
        name: "ハーフポークカレー＋ソーセージ（2本）",
        englishName: null,
        price: 730,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1848",
      },
      {
        id: "1849",
        name: "ハーフポークカレー＋ハーフイカ",
        englishName: null,
        price: 688,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1849",
      },
    ],
  },
  {
    id: "8",
    name: "特定原材料を使用していないカレー",
    items: [
      {
        id: "68",
        name: "特定原材料を使用していないカレー（ライス200g）",
        englishName: "Allergen-free Cury",
        price: 464,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=68",
      },
      {
        id: "67",
        name: "特定原材料を使用していないカレー（ライス100g）",
        englishName: "Allergen-free Cury",
        price: 232,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=67",
      },
    ],
  },
  {
    id: "7",
    name: "お子さまメニュー",
    items: [
      {
        id: "1018",
        name: "お子さまカレー　ハンバーグ",
        englishName: "Children's curry Hamburger",
        price: 456,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1018",
      },
      {
        id: "1247",
        name: "お子さまカレー フライドチキン",
        englishName: "Children's curry Fried chicken",
        price: 456,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1247",
      },
      {
        id: "1248",
        name: "お子さまカレー ハンバーグ＆フライドチキン",
        englishName: "Children's curry Hamburger & fried chicken",
        price: 550,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1248",
      },
      {
        id: "1249",
        name: "お子さまカレー クリームコロッケ（カニ入り）＆フライドチキン",
        englishName:
          "Children's curry Cream croquette (with crab) & fried chicken",
        price: 550,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1249",
      },
      {
        id: "1014",
        name: "ミニお子さまカレー",
        englishName: "Mini Kids Curry",
        price: 352,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1014",
      },
      {
        id: "1013",
        name: "ミニお子さまナンカレー",
        englishName: "Mini Kids Curry with Nan Bread",
        price: 352,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1013",
      },
      {
        id: "77",
        name: "1歳からのやさしい野菜カレー",
        englishName: "Vegetable curry for children aged one year or more",
        price: 210,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=77",
      },
      {
        id: "314",
        name: "ベビーフード",
        englishName: null,
        price: 189,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=314",
      },
      {
        id: "138",
        name: "単品ミニナン",
        englishName: null,
        price: 148,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=138",
      },
    ],
  },
  {
    id: "22",
    name: "麺類",
    items: [
      {
        id: "1704",
        name: "カレーうどん",
        englishName: "Curry udon",
        price: 850,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1704",
      },
      {
        id: "1709",
        name: "カレーうどん（ライス付）",
        englishName: null,
        price: 960,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1709",
      },
      {
        id: "1708",
        name: "カレーらーめん",
        englishName: "Curry ramen",
        price: 890,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1708",
      },
      {
        id: "1707",
        name: "チャーシューカレーらーめん",
        englishName: null,
        price: 1250,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1707",
      },
      {
        id: "1706",
        name: "カレーらーめん（ライス付）",
        englishName: null,
        price: 1000,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1706",
      },
      {
        id: "1705",
        name: "チャーシューカレーらーめん（ライス付）",
        englishName: null,
        price: 1360,
        detailUrl: "https://www.ichibanya.co.jp/menu/detail.html?id=1705",
      },
    ],
  },
];

export { spiceLevels } from "./spiceLevels.ts";
export { menuOptions, riceOptionPricing } from "./options.ts";
export { toppings } from "./toppings.ts";
export { sauceSelection } from "./sauces.ts";
export type { SpiceLevel } from "./spiceLevels.ts";
export type { MenuOption, RiceOptionPricing } from "./options.ts";
export type { Topping } from "./toppings.ts";
export type { Sauce, SauceSelection } from "./sauces.ts";
