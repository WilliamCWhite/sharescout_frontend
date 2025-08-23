import { useRef, useState } from "react";
import type { SeriesTicker } from "../lib/interfaces";
import type { ChangeEvent } from "react";

interface SeriesBoxTickerProps {
  seriesTicker: SeriesTicker;
  deleteSelf: () => void;
  updateSelfInvestment: (ticker: string, newInvestment: number) => void
}
function SeriesBoxTicker(props: SeriesBoxTickerProps) {
  const [investmentInput, setInvestmentInput] = useState<number>(100)
  const inputRef = useRef<HTMLInputElement | null>(null)

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const newNumber = Number(event.target.value)
    if (newNumber === undefined) {
      if (inputRef && inputRef.current) {
        inputRef.current.value = investmentInput.toString()
        return
      }
      return
    }
    setInvestmentInput(newNumber)
  }

  function handleBlur() {
    props.updateSelfInvestment(props.seriesTicker.ticker, investmentInput)
  }

  return (
    <div className="bg-yellow-400">
      <p>{props.seriesTicker.ticker}</p>
      <input ref={inputRef} type="number" value={investmentInput} onChange={handleChange} onBlur={handleBlur} />
      <button onClick={props.deleteSelf}>Delete</button>
    </div>
  );
}

export default SeriesBoxTicker;
