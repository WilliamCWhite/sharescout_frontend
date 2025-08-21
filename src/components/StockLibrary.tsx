import SearchBar from "./SearchBar";
import { useEffect, useState } from "react";
import LibraryTicker from "./LibraryTicker";
import { RangeSetting, type DateRange } from "../lib/interfaces";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
import SeriesBox from "./SeriesBox";
import { addTickerByDragEvent, removeSeriesListTicker } from "../lib/seriesTickerListHandling";
import { updateDBIfEmpty } from "../lib/db";

interface StockLibraryProps {
  rangeSetting: RangeSetting 
  activeRange: DateRange
  seriesTickerLists: string[][]
  setSeriesTickerLists: any
}

function StockLibrary(props: StockLibraryProps) {
  const [libTickers, setLibTickers] = useState<string[]>([])

  useEffect(() => {
    console.log("entered useEffect, tickers =")
    console.log(libTickers)
    for (const ticker of libTickers) {
      console.log(`from useEffect, about to process ticker ${ticker}`)
      console.log(ticker)
      updateDBIfEmpty(ticker, props.rangeSetting, props.activeRange)
    }
  }, [props.activeRange]) 

  async function addTicker(ticker: string) {
    try {
      console.log(`Adding ticker ${ticker}, currenlty tickers = ${libTickers}`)
      if (libTickers.includes(ticker)) {
        console.log("oh tickers already had that")
        return
      }
      setLibTickers([...libTickers, ticker])
      await updateDBIfEmpty(ticker, props.rangeSetting, props.activeRange)
    }
    catch (error) {
      console.error(error)
    }
  }

  const tickerComponents = libTickers.map((ticker: string, index: number) => {
    return (
      <LibraryTicker key={index} ticker={ticker} />
    )
  })

  function handleDragEnd(event: DragEndEvent) {
    props.setSeriesTickerLists(addTickerByDragEvent(props.seriesTickerLists, event))
  }

  function removeTickerFromList(index: number, ticker: string) {
    props.setSeriesTickerLists(removeSeriesListTicker(props.seriesTickerLists, index, ticker))
  }
  
  const seriesBoxes = props.seriesTickerLists.map((list: string[], index: number) => {
    return (
      <SeriesBox key={index} seriesIndex={index} seriesTickerList={list} removeTickerFromList={removeTickerFromList}/>
    )
  })

  return (
    <section className="w-full flex flex-col bg-blue-100">
      <p>Hello</p>
      <SearchBar addTicker={addTicker}/>
      <DndContext onDragEnd={handleDragEnd}>
        <section className="w-full flex min-h-10">
          {tickerComponents}
        </section>
        <section>
          {seriesBoxes}
        </section>
      </DndContext>
    </section>
  );
}

export default StockLibrary;
