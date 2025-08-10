import { useEffect, useState } from "react"
import BasicAreaChart from "../charts/BasicAreaChart"
import type { ResponsePoint } from "../lib/interfaces"

function ChartPage() {

  const [responsePoints, setResponsePoints] = useState<ResponsePoint[]>([])

  useEffect(() => {
    const fetchDataFunc = async () => {
      getData()
    }
    fetchDataFunc()
  }, [])

  async function getData() {
    const response = await fetch("http://localhost:6060/api/chart/AAPL", {
      method: "POST",
      body: JSON.stringify({
        "start_date": "2015-08-08T22:37:12.345Z",
        "end_date": "2025-08-08T22:37:12.345Z"
      })
    })

    const data = (await response.json()) as ResponsePoint[] 
    console.log(data)

    setResponsePoints(data)
  }

  return (
    <div>
      <p>Hello</p>
      <BasicAreaChart responsePoints={responsePoints} field={"percentGrowth"} field2={"percentReturns"}/>
      <BasicAreaChart responsePoints={responsePoints} field={"price"} field2={"thousandIn"}/>
    </div>
  )
}

export default ChartPage
