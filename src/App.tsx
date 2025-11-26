import { useState, useEffect } from "react";
import type { SeriesTicker } from "./lib/interfaces";
import { RangeSetting, type DateRange } from "./lib/interfaces";
import BasicAreaChart from "./charts/BasicAreaChart";
import Header from "./components/Header";
import DateSelector from "./components/DateSelector";
import StockLibrary from "./components/StockLibrary";
import { generateSetRange } from "./lib/generateRanges";
import { useLiveQuery } from "dexie-react-hooks";
import type { AreaData, Time } from "lightweight-charts";
import { chartDataToAreaPoints, retrieveChartData } from "./lib/chartDataHandling";

function App() {
  // const [responsePoints, setResponsePoints] = useState<ResponsePoint[][]>([]);
  const [chart1Points, setChart1Points] = useState<AreaData<Time>[]>([]);

  const [rangeSetting, setRangeSetting] = useState<RangeSetting>(RangeSetting.OneMonth)
  const [activeRange, setActiveRange] = useState<DateRange>(generateSetRange(RangeSetting.OneMonth))

  const [seriesTickerLists, setSeriesTickerLists] = useState<SeriesTicker[][]>([[],[],[],[]])

  const chart1Data = useLiveQuery(async () => {
    return await retrieveChartData(seriesTickerLists[0], rangeSetting)
  }, [seriesTickerLists[0], activeRange])

  console.log("chart1Data:")
  console.log(chart1Data)

  useEffect(() => {
    if (!chart1Data) {
      return
    }
    const tempPoints = chartDataToAreaPoints(chart1Data, seriesTickerLists[0])
    if (!tempPoints) {
      return
    }
    setChart1Points(tempPoints)
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
