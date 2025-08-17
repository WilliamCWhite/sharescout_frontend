import type { SearchQuote } from "../lib/interfaces"

interface SearchResultProps {
  quote: SearchQuote
}

function SearchResult(props: SearchResultProps) {
  return (
    <div className="w-xl flex justify-between">
      <div className="flex flex-col">
        <h4>{props.quote.symbol}</h4>
        <p>{props.quote.shortname}</p>
      </div>
      <div className="flex flex-col">
        <p>{props.quote.typeDisp}</p>
        <p>{props.quote.sectorDisp}</p>
      </div>
    </div>

  )

}

export default SearchResult
