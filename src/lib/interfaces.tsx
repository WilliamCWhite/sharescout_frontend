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

