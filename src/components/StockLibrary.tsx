import SearchBar from "./SearchBar";
import { addStockData, getStockData, updateStockData, type StockData } from "../lib/db";
import { useEffect, useState } from "react";
import Ticker from "./Ticker";
import { RangeSetting, type DateRange } from "../lib/interfaces";
import { getResponsePoints } from "../lib/apiRequests";
import { makeStockDataPartial } from "../lib/rangeToStockData";
import { customRangeToStringKey } from "../lib/generateRanges";
import { DndContext } from "@dnd-kit/core";
import SeriesBox from "./SeriesBox";

interface StockLibraryProps {
  rangeSetting: RangeSetting 
  activeRange: DateRange
}

function StockLibrary(props: StockLibraryProps) {
  const [tickers, setTickers] = useState<string[]>([])

  useEffect(() => {
    console.log("entered useEffect, tickers =")
    console.log(tickers)
    for (const ticker of tickers) {
      console.log(`from useEffect, about to process ticker ${ticker}`)
      console.log(ticker)
      processTicker(ticker, props.rangeSetting, props.activeRange)
    }
  }, [props.activeRange]) 

  async function addTicker(ticker: string) {
    try {
      console.log(`Adding ticker ${ticker}, currenlty tickers = ${tickers}`)
      if (tickers.includes(ticker)) {
        console.log("oh tickers already had that")
        return
      }
      setTickers([...tickers, ticker])
      await addStockData({
        ticker: ticker
      }) 
      await processTicker(ticker, props.rangeSetting, props.activeRange)
    }
    catch (error) {
      console.error(error)
    }
  }

  async function processTicker(ticker: string, rangeSetting: RangeSetting, activeRange: DateRange) {
    try {
      // TODO: make a get method that only retrieves current rangeSetting cuz this process od data
      const result = await getStockData(ticker)
      if (result === undefined) {
        throw new Error("stock not in tickers")
      }
      if (rangeSetting !== RangeSetting.Custom && result[rangeSetting].length > 0) {
        console.log(`data for ticker ${ticker} with current range setting already exists`)
        return
      }
      if (rangeSetting === RangeSetting.Custom && customRangeToStringKey(activeRange) === result.customRange) {
        console.log(`data for ticker ${ticker} with current custom range setting already exists`)
        return
      }

      console.log("attempting to update data in db")
      const data = await getResponsePoints(ticker, activeRange)
      console.log("data received from backend:")
      console.log(data)
      const stockDataPartial: Partial<StockData> = makeStockDataPartial(ticker, rangeSetting, activeRange, data)
      const update = await updateStockData(ticker, stockDataPartial)
      if (update === 0) {
        console.log("failed to update data")
      }
    }
    catch (error) {
      console.error(error)
    }
  }

  const tickerComponents = tickers.map((ticker: string, index: number) => {
    return (
      <Ticker key={index} ticker={ticker} />
    )
  })

  return (
    <section className="w-full flex flex-col bg-blue-100">
      <p>Hello</p>
      <SearchBar addTicker={addTicker}/>
      <DndContext>
        <section className="w-full flex min-h-10">
          {tickerComponents}
        </section>
        <section>
          <SeriesBox />
        </section>
      </DndContext>
    </section>
  );
}

export default StockLibrary;
