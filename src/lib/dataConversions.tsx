import type { AreaData, Time, UTCTimestamp } from "lightweight-charts";
import type { ResponsePoint } from "./interfaces";

export const DataDisplaySetting = {
  Price: "Price",
  PercentGrowth: "PercentGrowth",
  ThousandIn: "ThousandIn",
  PercentReturns: "PercentReturns",
} as const;

export type DataDisplaySetting =
  (typeof DataDisplaySetting)[keyof typeof DataDisplaySetting];

export function convertResponsePoints(data: ResponsePoint[], field: DataDisplaySetting): AreaData<Time>[] {
  switch (field) {
    case DataDisplaySetting.Price:
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.price
      }))
    case DataDisplaySetting.PercentGrowth:
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.percentGrowth
      }))
    case DataDisplaySetting.ThousandIn:
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.thousandIn
      }))
    case DataDisplaySetting.PercentReturns:
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.percentReturns
      }))
    default: // default is price
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.price
      }))
  }
}
