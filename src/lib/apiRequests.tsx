import type { ResponsePoint } from "./interfaces"

export async function getResponsePoints(ticker: string, startDate: Date, endDate: Date): Promise<ResponsePoint[]> {
  const response = await fetch(`http://localhost:6060/api/stock/${ticker}`, {
    method: "POST",
    body: JSON.stringify({
      "start_date": startDate.toISOString(),
      "end_date": endDate.toISOString()
    })
  })

  const data = (await response.json()) as ResponsePoint[] 
  return data
}

