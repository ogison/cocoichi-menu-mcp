export type SpiceLevel = {
  id: string;
  japaneseName: string;
  englishName: string | null;
  heatLevelIndicator: string;
  priceAdjustment: number;
};

export const spiceLevels: SpiceLevel[] = [
  {
    id: "mild",
    japaneseName: "甘口",
    englishName: "Mild",
    heatLevelIndicator: "-1",
    priceAdjustment: 0,
  },
  {
    id: "standard",
    japaneseName: "普通",
    englishName: "Standard",
    heatLevelIndicator: "0",
    priceAdjustment: 0,
  },
  {
    id: "level-1",
    japaneseName: "1辛",
    englishName: "Spice Level 1",
    heatLevelIndicator: "1",
    priceAdjustment: 25,
  },
  {
    id: "level-2",
    japaneseName: "2辛",
    englishName: "Spice Level 2",
    heatLevelIndicator: "2",
    priceAdjustment: 50,
  },
  {
    id: "level-3",
    japaneseName: "3辛",
    englishName: "Spice Level 3",
    heatLevelIndicator: "3",
    priceAdjustment: 75,
  },
  {
    id: "level-4",
    japaneseName: "4辛",
    englishName: "Spice Level 4",
    heatLevelIndicator: "4",
    priceAdjustment: 100,
  },
  {
    id: "level-5",
    japaneseName: "5辛",
    englishName: "Spice Level 5",
    heatLevelIndicator: "5",
    priceAdjustment: 125,
  },
  {
    id: "level-6",
    japaneseName: "6辛",
    englishName: "Spice Level 6",
    heatLevelIndicator: "6",
    priceAdjustment: 150,
  },
  {
    id: "level-7",
    japaneseName: "7辛",
    englishName: "Spice Level 7",
    heatLevelIndicator: "7",
    priceAdjustment: 150,
  },
  {
    id: "level-8",
    japaneseName: "8辛",
    englishName: "Spice Level 8",
    heatLevelIndicator: "8",
    priceAdjustment: 150,
  },
  {
    id: "level-9",
    japaneseName: "9辛",
    englishName: "Spice Level 9",
    heatLevelIndicator: "9",
    priceAdjustment: 150,
  },
  {
    id: "level-10",
    japaneseName: "10辛",
    englishName: "Spice Level 10",
    heatLevelIndicator: "10",
    priceAdjustment: 150,
  },
];
