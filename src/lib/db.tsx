import Dexie, { type Table } from "dexie";
import { RangeSetting, type DateRange, type ResponsePoint } from "./interfaces";
import { customRangeToStringKey } from "./generateRanges";
import { getResponsePoints } from "./apiRequests";

export interface DBSchema {
  [RangeSetting.OneDay]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.FiveDay]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.OneMonth]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.ThreeMonth]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.SixMonth]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.YTD]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.OneYear]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.TwoYear]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.FiveYear]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
  [RangeSetting.Custom]: {
    ticker: string;
    customRange: string;
    values: ResponsePoint[];
  };
}

export class MyDatabase extends Dexie {
  tickers!: Table<{ ticker: string }, string>;

  // Generate one Table<T, string> per DBSchema key
  rangeTables!: {
    [K in keyof DBSchema]: Table<DBSchema[K], string>;
  };

  constructor() {
    super("MyDatabase");

    this.version(1).stores({
      tickers: "ticker",
      oneDay: "ticker",
      fiveDay: "ticker",
      oneMonth: "ticker",
      threeMonth: "ticker",
      sixMonth: "ticker",
      ytd: "ticker",
      oneYear: "ticker",
      twoYear: "ticker",
      fiveYear: "ticker",
      custom: "ticker",
    });

    // hook up the tables map
    this.rangeTables = {
      oneDay: this.table("oneDay"),
      fiveDay: this.table("fiveDay"),
      oneMonth: this.table("oneMonth"),
      threeMonth: this.table("threeMonth"),
      sixMonth: this.table("sixMonth"),
      ytd: this.table("ytd"),
      oneYear: this.table("oneYear"),
      twoYear: this.table("twoYear"),
      fiveYear: this.table("fiveYear"),
      custom: this.table("custom"),
    };
  }

  // nice generic getter
  getTable<K extends RangeSetting>(range: K): Table<DBSchema[K], string> {
    return this.rangeTables[range];
  }
}

export const db = new MyDatabase();

db.delete().then(() => {
  console.log("Database reset on reload");
  db.open(); // re-open a fresh database
});

export async function updateDBIfEmpty(
  ticker: string,
  rangeSetting: RangeSetting,
  activeRange: DateRange,
): Promise<boolean> {
  const exists = await db.getTable(rangeSetting).get(ticker);

  if (exists && rangeSetting !== RangeSetting.Custom && rangeSetting !== RangeSetting.OneDay) {
    return false
  }
  if (exists && rangeSetting === RangeSetting.Custom && exists.customRange === customRangeToStringKey(activeRange)) {
    return false
  }
  // This code runs if it doesn't exist or if it does but rangesetting is oneday or a new custom range

  const responsePoints = await getResponsePoints(ticker, activeRange)

  let customRangeToPut: string = ""
  if (rangeSetting === RangeSetting.Custom) {
    customRangeToPut = customRangeToStringKey(activeRange)
  }

  const dbResponse = await db.getTable(rangeSetting).put({
    ticker: ticker,
    values: responsePoints,
    customRange: customRangeToPut
  }, ticker)

  if (dbResponse) {
    return true
  }
  return false
}

export async function getTickerDataFromDB(ticker: string) {
  console.log(`getting all data for ticker: ${ticker}`)
  try {
    for (const setting of Object.values(RangeSetting)) {
      const result = await db.getTable(setting).get(ticker)
      console.log(result)
    }
  }
  catch (error) {
    console.error(error)
  }
}

export async function getTickerRangeValues(ticker: string, rangeSetting: RangeSetting) {
  try {
    const result = await db.getTable(rangeSetting).get(ticker)
    return result?.values
  }
  catch (error) {
    console.error(error)
  }
}

