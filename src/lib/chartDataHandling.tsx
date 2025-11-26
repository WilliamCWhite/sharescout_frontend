import type { ChartData, RangeSetting, ResponsePoint } from "./interfaces"
import { SeriesDisplaySetting } from "./interfaces"
import type { UTCTimestamp, AreaData, Time } from "lightweight-charts"
import type { SeriesTicker } from "./interfaces"
import { getTickerRangeValues } from "./db"
import {  makeMapFromTickerList } from "./seriesTickerListHandling"

export async function retrieveChartData(seriesTickerList: SeriesTicker[], rangeSetting: RangeSetting): Promise<ChartData> {
  let result: ChartData = {}
  for (const seriesTicker of seriesTickerList) {
    const tickerResult = await getTickerRangeValues(seriesTicker.ticker, rangeSetting)
    console.log(tickerResult)
    if (!tickerResult) {
      console.log("There was no ticker result")
      continue
    }
    result[seriesTicker.ticker] = tickerResult
  }
  return result
}

export function chartDataToAreaPoints(chartData: ChartData, seriesTickerList: SeriesTicker[], setting: SeriesDisplaySetting): AreaData<Time>[] | undefined {
  let tempChart1Points: AreaData<Time>[] = []

  let maxLength = 0
  let maxTicker = ""
  for (const [ticker, arr] of Object.entries(chartData)) {
    if (!arr) continue

    if (arr.length > maxLength) {
      maxLength = arr.length
      maxTicker = ticker
    }
  }

  const tickerMap = makeMapFromTickerList(seriesTickerList)

  let totalInvestment = 0
  for (const ticker in tickerMap) {
    totalInvestment += tickerMap[ticker]
  }

  for (let i = 0; i < maxLength; i++) {
    const timestamp = chartData[maxTicker][i].timestamp
    let value = 0
    
    for (const ticker of Object.keys(chartData)) {
      // if this array doesn't include most recent points
      if (i >= chartData[ticker].length) {
        const lastIndex = chartData[ticker].length - 1
        value += calculateAdditionalValue(setting, tickerMap[ticker], chartData[ticker][lastIndex], totalInvestment)
      }
      else {
        value += calculateAdditionalValue(setting, tickerMap[ticker], chartData[ticker][i], totalInvestment)
      }
    }

    tempChart1Points.push({
      time: timestamp as UTCTimestamp,
      value: value
    })
  }
  return tempChart1Points
}

function calculateAdditionalValue(setting: SeriesDisplaySetting, investment: number, point: ResponsePoint, totalInvestment: number): number {
  switch (setting) {
    case SeriesDisplaySetting.Balance:
      return investment * (point.percentReturns / 100 + 1)
    case SeriesDisplaySetting.PriceBalance:
      return investment * (point.percentGrowth / 100 + 1)
    case SeriesDisplaySetting.Returns:
      return investment * (point.percentReturns / 100)
    case SeriesDisplaySetting.PriceReturns:
      return investment * (point.percentGrowth / 100)
    case SeriesDisplaySetting.Growth:
      return (investment / totalInvestment) * (point.percentReturns)
    case SeriesDisplaySetting.PriceGrowth:
      return (investment / totalInvestment) * (point.percentGrowth)
    case SeriesDisplaySetting.CombinedPrice:
      return point.price
    default:
      return 0
  }
}
