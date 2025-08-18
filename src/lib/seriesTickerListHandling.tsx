import type { DragEndEvent } from "@dnd-kit/core";

export function addTickerByDragEvent(tickerLists: string[][], event: DragEndEvent): string[][] {

  const deepCopy: string[][] = tickerLists.map(inner => [...inner])

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

  if (deepCopy[index].includes(tickerToAdd)) {
    return deepCopy
  }

  deepCopy[index].push(tickerToAdd)
  return deepCopy
}

export function removeSeriesListTicker(tickerLists: string[][], index: number, ticker: string): string[][] {
  const deepCopy: string[][] = tickerLists.map(inner => [...inner])

  if (index >= deepCopy.length) {
    console.log("index out of bounds")
    return deepCopy
  }

  if (!deepCopy[index].includes(ticker)) {
    console.log("does not include ticker")
  }
  
  const indexToRemove = deepCopy[index].indexOf(ticker)

  console.log(deepCopy[index])
  deepCopy[index].splice(indexToRemove, 1)
  console.log(deepCopy[index])

  return deepCopy
}
