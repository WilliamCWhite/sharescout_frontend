import type { DateRange, ResponsePoint, SearchQuote } from "./interfaces"

export async function getResponsePoints(ticker: string, dateRange: DateRange): Promise<ResponsePoint[]> {
  try {
    console.log(dateRange)
    const response = await fetch(`http://localhost:6060/api/stock/${encodeURIComponent(ticker)}`, {
      method: "POST",
      body: JSON.stringify({
        "start_date": dateRange.startDate.toISOString(),
        "end_date": dateRange.endDate.toISOString()
      })
    })

    const data = (await response.json()) as ResponsePoint[] 
    return data
  }
  catch (error) {
    console.error(error)
    return []
  }
}

export async function getSearchResults(input: string): Promise<SearchQuote[]> {
  if (input == "") {
    return []
  }
  try {
    const response = await fetch(`http://localhost:6060/api/search/${encodeURIComponent(input)}`, {
      method: "GET"
    })

    const data = (await response.json()) as SearchQuote[]
    return data

  }
  catch(error) {
    console.error(error)
    return []
  }
}
