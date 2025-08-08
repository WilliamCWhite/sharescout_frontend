import { useEffect, useState } from "react"
import BasicAreaChart from "../charts/BasicAreaChart"
import type { DataPoint, ResponsePoint } from "../lib/interfaces"

function StocksPage() {

  const [chartData, setChartData] = useState<DataPoint[]>([])

  useEffect(() => {
    const fetchDataFunc = async () => {
      getData()
    }
    fetchDataFunc()
  }, [])

  async function getData() {
    const response = await fetch("http://localhost:6060/api/stocks/AAPL", {
      method: "POST",
      body: JSON.stringify({
        "start_date": "2025-07-17T22:37:12.345Z",
        "end_date": "2025-08-06T22:37:12.345Z"
      })
    })

    const data = (await response.json()) as ResponsePoint[] 
    const dataPoints: DataPoint[] = data.map((d) => ({
      time: new Date(d.time),
      value: d.value
    }))

    console.log(dataPoints[0])

    setChartData(dataPoints)
  }

  return (
    <div>
      <p>Hello</p>
      <BasicAreaChart data={chartData} />
    </div>
  )
}

export default StocksPage
