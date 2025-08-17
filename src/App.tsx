import { useState, useEffect } from "react";
import type { ResponsePoint } from "./lib/interfaces";
import { DataDisplaySetting, RangeSetting, type DateRange } from "./lib/interfaces";
import { getResponsePoints } from "./lib/apiRequests";
import BasicAreaChart from "./charts/BasicAreaChart";
import Header from "./components/Header";
import DateSelector from "./components/DateSelector";
import StockLibrary from "./components/StockLibrary";
import { generateSetRange } from "./lib/generateRanges";

function App() {
  const [responsePoints, setResponsePoints] = useState<ResponsePoint[][]>([]);

  const [rangeSetting, setRangeSetting] = useState<RangeSetting>(RangeSetting.OneMonth)
  const [activeRange, setActiveRange] = useState<DateRange>(generateSetRange(RangeSetting.OneMonth))
  
  useEffect(() => {

  })

  useEffect(() => {
    const fetchDataFunc = async () => {
      const data = await getResponsePoints("AAPL", activeRange);
      setResponsePoints([data]);
    };
    fetchDataFunc();
  }, [activeRange]);



  return (
    <div className="w-full h-dvh flex-center flex-col">
      <Header />
      <main className="w-full max-w-7xl flex-grow bg-gray-100">
        <DateSelector setActiveRange={setActiveRange} rangeSetting={rangeSetting} setRangeSetting={setRangeSetting}/>
        <BasicAreaChart
          responsePoints={responsePoints.length > 0 ? responsePoints[0] : null}
          field={DataDisplaySetting.PercentGrowth}
          field2={DataDisplaySetting.PercentReturns}
        />
        <StockLibrary />
      </main>
    </div>
  );
}

export default App;
