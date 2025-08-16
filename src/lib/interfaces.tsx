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
  OneDay: "1d",
  FiveDay: "5d",
  OneMonth: "1m",
  ThreeMonth: "3m",
  SixMonth: "6m",
  YTD: "YTD",
  OneYear: "1y",
  TwoYear: "2y",
  FiveYear: "5y",
  Custom: "custom"
} as const;

export type RangeSetting =
  (typeof RangeSetting)[keyof typeof RangeSetting];

export interface DateRange {
  startDate: Date,
  endDate: Date
}
