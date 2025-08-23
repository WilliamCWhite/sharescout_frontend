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

export const DataDisplaySetting = {
  Price: "Price",
  PercentGrowth: "PercentGrowth",
  ThousandIn: "ThousandIn",
  PercentReturns: "PercentReturns",
} as const;

export type DataDisplaySetting =
  (typeof DataDisplaySetting)[keyof typeof DataDisplaySetting];

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
