import { Dexie, type EntityTable } from 'dexie';
import { RangeSetting, type ResponsePoint } from './interfaces';

export interface StockData {
  ticker: string;
  [RangeSetting.OneDay]: ResponsePoint[];
  [RangeSetting.FiveDay]: ResponsePoint[];
  [RangeSetting.OneMonth]: ResponsePoint[];
  [RangeSetting.ThreeMonth]: ResponsePoint[];
  [RangeSetting.SixMonth]: ResponsePoint[];
  [RangeSetting.YTD]: ResponsePoint[];
  [RangeSetting.OneYear]: ResponsePoint[];
  [RangeSetting.TwoYear]: ResponsePoint[];
  [RangeSetting.FiveYear]: ResponsePoint[];
  [RangeSetting.Custom]: ResponsePoint[];
  customRange: string;
}

export const db = new Dexie('FriendDatabase') as Dexie & {
  stocks: EntityTable<StockData, 'ticker'>;
};

db.version(1).stores({
  stocks: 'ticker, oneDay, fiveDay, oneMonth, threeMonth, sixMonth, ytd, oneYear, twoYear, fiveYear, custom, customRange',
});

// wipes stock table at start of every reload
db.on('ready', async () => {
  await db.stocks.clear(); 
});

export async function addStockData(stockData: Partial<StockData>) {
  return db.stocks.add({
    oneDay: [],
    fiveDay: [],
    oneMonth: [],
    threeMonth: [],
    sixMonth: [],
    ytd: [],
    oneYear: [],
    twoYear: [],
    fiveYear: [],
    custom: [],
    customRange: "",
    ...stockData
  })
}

export async function updateStockData(ticker: string, stockDataPartial: Partial<StockData>) {
  return db.stocks.update(ticker, stockDataPartial)
}

export async function getStockData(ticker: string): Promise<StockData | undefined> {
  try {
    const result = await db.stocks.get(ticker)
    return result
  }
  catch (error) {
    console.error(error)
  }
}
