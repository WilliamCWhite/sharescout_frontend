import type { DateRange, ResponsePoint } from "./interfaces"

export async function getResponsePoints(ticker: string, dateRange: DateRange): Promise<ResponsePoint[]> {
  const response = await fetch(`http://localhost:6060/api/stock/${ticker}`, {
    method: "POST",
    body: JSON.stringify({
      "start_date": dateRange.startDate.toISOString(),
      "end_date": dateRange.endDate.toISOString()
    })
  })

  const data = (await response.json()) as ResponsePoint[] 
  return data
}

