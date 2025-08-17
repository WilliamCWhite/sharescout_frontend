import { Dexie, type EntityTable } from 'dexie';
import type { ResponsePoint } from './interfaces';

export interface StockData {
  ticker: string;
  oneDay: ResponsePoint[];
  fiveDay: ResponsePoint[];
  oneMonth: ResponsePoint[];
  threeMonth: ResponsePoint[];
  sixMonth: ResponsePoint[];
  ytd: ResponsePoint[];
  oneYear: ResponsePoint[];
  twoYear: ResponsePoint[];
  fiveYear: ResponsePoint[];
  custom: ResponsePoint[];
  customRange: string;
}

export const db = new Dexie('FriendDatabase') as Dexie & {
  stocks: EntityTable<StockData, 'ticker'>;
};

db.version(1).stores({
  stocks: 'ticker, oneDay, fiveDay, oneMonth, threeMonth, sixMonth, ytd, oneYear, twoYear, fiveYear, custom, customRange',
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
