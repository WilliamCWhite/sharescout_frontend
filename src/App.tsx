import { useState, useEffect } from "react";
import type { ResponsePoint } from "./lib/interfaces";
import { getResponsePoints } from "./lib/apiRequests";
import { DataDisplaySetting } from "./lib/dataConversions";
import BasicAreaChart from "./charts/BasicAreaChart";

function App() {
  const [responsePoints, setResponsePoints] = useState<ResponsePoint[][]>([]);

  const now = new Date();
  const fiveYearsAgo = new Date();
  fiveYearsAgo.setFullYear(now.getFullYear() - 5);

  useEffect(() => {
    const fetchDataFunc = async () => {
      const data = await getResponsePoints("AAPL", fiveYearsAgo, now);
      setResponsePoints([data]);
    };
    fetchDataFunc();
  }, []);

  return (
    <div className="w-full h-dvh flex-center flex-col">
      {/* <Header /> */}
      <main className="w-full max-w-7xl flex-grow bg-gray-100">
        <BasicAreaChart
          responsePoints={responsePoints.length > 0 ? responsePoints[0] : null}
          field={DataDisplaySetting.PercentGrowth}
          field2={DataDisplaySetting.PercentReturns}
        />
      </main>
    </div>
  );
}

export default App;
