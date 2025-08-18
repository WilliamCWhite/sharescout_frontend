import { RangeSetting, type DateRange, type ResponsePoint } from "./interfaces";
import type { StockData } from "./db";
import { customRangeToStringKey } from "./generateRanges";

export function makeStockDataPartial(ticker: string, rangeSetting: RangeSetting, activeRange: DateRange, responsePoints: ResponsePoint[]): Partial<StockData> {
  let stockDataPartial: Partial<StockData>
  if (rangeSetting !== RangeSetting.Custom) {
    stockDataPartial = {
      ticker: ticker,
      [rangeSetting]: responsePoints
    }
  }
  else {
    const customKey = customRangeToStringKey(activeRange)
    stockDataPartial = {
      ticker: ticker,
      custom: responsePoints,
      customRange: customKey
    }
  }
  return stockDataPartial
}
