import { getStockData } from "../lib/db"



interface TickerProps {
  ticker: string
}

function Ticker(props: TickerProps) {

  async function handleClick() {
    const result = await getStockData(props.ticker)
    console.log(result)
  }

  return (
    <div className="bg-blue-300" onClick={handleClick}>
      {props.ticker}
    </div>
  )
}

export default Ticker
