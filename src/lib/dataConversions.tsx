import type { AreaData, Time, UTCTimestamp } from "lightweight-charts";
import type { ResponsePoint } from "./interfaces";


export function convertResponsePoints(data: ResponsePoint[], field: string): AreaData<Time>[] {
  switch (field) {
    case "price":
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.price
      }))
    case "percentGrowth":
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.percentGrowth
      }))
    case "thousandIn":
      return data.map((d) => ({
        time: d.timestamp as UTCTimestamp,
        value: d.thousandIn
      }))
    case "percentReturns":
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
