import type { DragEndEvent } from "@dnd-kit/core";
import type { SeriesTicker, SeriesTickerMap } from "./interfaces";

const DEFAULT_INVESTMENT = 100

export function addTickerByDragEvent(tickerLists: SeriesTicker[][], event: DragEndEvent): SeriesTicker[][] {

  const deepCopy: SeriesTicker[][] = tickerLists.map(inner => [...inner])

  if (!event.over || !event.active) {
    return deepCopy
  }
  const seriesIndexString = event.over.id.toString().split("-")[1]
  const index = Number(seriesIndexString)
  if (index === undefined) {
    console.log("error getting series index from over.id")
    return deepCopy
  }
  const tickerToAdd = event.active.id.toString()

  for (const copiedTicker of deepCopy[index]) {
    if (copiedTicker.ticker === tickerToAdd) {
      return deepCopy
    }
  }
  
  const seriesToAdd: SeriesTicker = {
    ticker: tickerToAdd,
    investment: DEFAULT_INVESTMENT
  }

  deepCopy[index].push(seriesToAdd)
  return deepCopy
}

export function removeSeriesListTicker(tickerLists: SeriesTicker[][], seriesIndex: number, ticker: string): SeriesTicker[][] {
  const deepCopy: SeriesTicker[][] = tickerLists.map(inner => [...inner])

  if (seriesIndex >= deepCopy.length) {
    console.log("index out of bounds")
    return deepCopy
  }

  if (indexOfTicker(deepCopy, seriesIndex, ticker) === -1) {
    console.log("does not include ticker")
    return deepCopy
  }
  
  const indexToRemove = indexOfTicker(deepCopy, seriesIndex, ticker)

  console.log(deepCopy[seriesIndex])
  deepCopy[seriesIndex].splice(indexToRemove, 1)
  console.log(deepCopy[seriesIndex])

  return deepCopy
}

export function generateUpdatedTickerInvestment(tickerLists: SeriesTicker[][], seriesIndex: number, ticker: string, newInvestment: number): SeriesTicker[][] {
  const deepCopy: SeriesTicker[][] = tickerLists.map(inner => [...inner])

  if (seriesIndex >= deepCopy.length) {
    console.log("index out of bounds")
    return deepCopy
  }

  if (indexOfTicker(deepCopy, seriesIndex, ticker) === -1) {
    console.log("does not include ticker")
    return deepCopy
  }

  const indexToUpdate = indexOfTicker(deepCopy, seriesIndex, ticker)
  deepCopy[seriesIndex][indexToUpdate].investment = newInvestment
  return deepCopy
}

// TODO: Write index of function (basic code is in addTicker method already)
function indexOfTicker(deepCopy: SeriesTicker[][], seriesIndex: number,  ticker: string): number {
  for (let i = 0; i < deepCopy[seriesIndex].length; i++) {
    if (deepCopy[seriesIndex][i].ticker === ticker) {
      return i
    }
  }
  return -1
}

export function makeMapFromTickerList(tickerList: SeriesTicker[]): SeriesTickerMap {
  const result: SeriesTickerMap = {}
  for (const seriesTicker of tickerList) {
    result[seriesTicker.ticker] = seriesTicker.investment
  }
  return result
}
