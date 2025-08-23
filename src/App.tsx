import { useState, useEffect } from "react";
import type { ResponsePoint, SeriesTicker } from "./lib/interfaces";
import { RangeSetting, type DateRange } from "./lib/interfaces";
import BasicAreaChart from "./charts/BasicAreaChart";
import Header from "./components/Header";
import DateSelector from "./components/DateSelector";
import StockLibrary from "./components/StockLibrary";
import { generateSetRange } from "./lib/generateRanges";
import { useLiveQuery } from "dexie-react-hooks";
import { getTickerRangeValues } from "./lib/db";
import type { AreaData, Time, UTCTimestamp } from "lightweight-charts";

function App() {
  // const [responsePoints, setResponsePoints] = useState<ResponsePoint[][]>([]);
  const [chart1Points, setChart1Points] = useState<AreaData<Time>[]>([]);

  const [rangeSetting, setRangeSetting] = useState<RangeSetting>(RangeSetting.OneMonth)
  const [activeRange, setActiveRange] = useState<DateRange>(generateSetRange(RangeSetting.OneMonth))

  const [seriesTickerLists, setSeriesTickerLists] = useState<SeriesTicker[][]>([[],[],[],[]])

  const chart1Data = useLiveQuery(async () => {
    let result: ResponsePoint[][] = []
    for (const seriesTicker of seriesTickerLists[0]) {
      const tickerResult = await getTickerRangeValues(seriesTicker.ticker, rangeSetting)
      console.log(tickerResult)
      if (!tickerResult) {
        console.log("There was no ticker result")
        continue
      }
      result.push(tickerResult)
    }
    return result
  }, [seriesTickerLists[0], activeRange])

  console.log("chart1Data:")
  console.log(chart1Data)

  useEffect(() => {
    let tempChart1Points: AreaData<Time>[] = []
    if (!chart1Data) return

    let maxLength = 0
    let maxIndex = -1
    for (let i = 0; i < chart1Data.length; i++) {
      if (!chart1Data[i]) continue

      if (chart1Data[i].length > maxLength) {
        maxLength = chart1Data[i].length
        maxIndex = i
      }
    }

    for (let i = 0; i < maxLength; i++) {
      const timestamp = chart1Data[maxIndex][i].timestamp
      let value = 0
      
      for (let j = 0; j < chart1Data.length; j++) {
        // if this array doesn't include most recent points
        if (i >= chart1Data[j].length) {
          const lastIndex = chart1Data[j].length - 1
          value += chart1Data[j][lastIndex].price
        }
        else {
          value += chart1Data[j][i].price
        }
      }

      tempChart1Points.push({
        time: timestamp as UTCTimestamp,
        value: value
      })

      setChart1Points(tempChart1Points)
    }
  }, [chart1Data])




  return (
    <div className="w-full h-dvh flex-center flex-col">
      <Header />
      <main className="w-full max-w-7xl flex-grow bg-gray-100">
        <DateSelector setActiveRange={setActiveRange} rangeSetting={rangeSetting} setRangeSetting={setRangeSetting}/>
        <BasicAreaChart
          chartPoints={chart1Points.length > 0 ? chart1Points : null}
        />
        <StockLibrary rangeSetting={rangeSetting} activeRange={activeRange} seriesTickerLists={seriesTickerLists} setSeriesTickerLists={setSeriesTickerLists}/>
      </main>
    </div>
  );
}

export default App;
