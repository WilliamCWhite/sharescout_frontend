import type { Time } from "lightweight-charts"

export interface DataPoint {
  time: Time
  value: number
}

// Received from requests to charts
export interface ResponsePoint {
  timestamp: number
  price: number
  percentGrowth: number
  thousandIn: number
  percentReturns: number
}

export const SeriesDisplaySetting = {
  Balance: "balance",
  PriceBalance: "priceBalance",
  Returns: "returns",
  PriceReturns: "priceReturns",
  Growth: "growth",
  PriceGrowth: "priceGrowth",
  CombinedPrice: "combinedPrice",
} as const;

export type SeriesDisplaySetting =
  (typeof SeriesDisplaySetting)[keyof typeof SeriesDisplaySetting];

export const RangeSetting = {
  OneDay: "oneDay",
  FiveDay: "fiveDay",
  OneMonth: "oneMonth",
  ThreeMonth: "threeMonth",
  SixMonth: "sixMonth",
  YTD: "ytd",
  OneYear: "oneYear",
  TwoYear: "twoYear",
  FiveYear: "fiveYear",
  Custom: "custom"
} as const;

export type RangeSetting =
  (typeof RangeSetting)[keyof typeof RangeSetting];

export interface DateRange {
  startDate: Date,
  endDate: Date
}

export interface SearchQuote {
  symbol: string,
  shortname: string,
  typeDisp: string,
  sectorDisp: string
}

export interface SeriesTicker {
  ticker: string,
  investment: number
}

export type ChartData = Record<string, ResponsePoint[]>

export type SeriesTickerMap = Record<string, number>
