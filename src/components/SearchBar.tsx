import { useEffect, useState } from "react"
import { type ChangeEvent } from "react";
import { type SearchQuote } from "../lib/interfaces";
import { getSearchResults } from "../lib/apiRequests";
import SearchResult from "./SearchResult";

const requestWaitMs = 500

interface SearchBarProps {
  addTicker: (ticker: string) => Promise<void>
}

function SearchBar(props: SearchBarProps) {
  const [currentText, setCurrentText] = useState<string>("")
  const [searchResults, setSearchResults] = useState<SearchQuote[]>([])
  const [showSearch, setShowSearch] = useState<boolean>(false)

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      const getAndSetData = async () => {
        const results = await getSearchResults(currentText)
        setSearchResults(results)
      }
      getAndSetData()
    }, requestWaitMs)

    return (() => clearTimeout(timeoutId))

  }, [currentText])

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCurrentText(event.target.value)
    setShowSearch(true)
  }

  // Must delay deselect to give browser time to handle click on conditionally rendered SearchResults
  function handleBlur() {
    // setTimeout(() => {
    //   setShowSearch(false)
    // }, 200)
    setShowSearch(false)
  }

  const searchResultComponents = searchResults.map((result: SearchQuote, index: number) => {
    return (
      <SearchResult key={index} quote={result} addTicker={props.addTicker}/>
    )
  })

  return (
    <div className="w-40 relative flex flex-col">
      <input type="text" value={currentText} onChange={handleChange} onBlur={handleBlur}/>
      <div className="absolute top-10 flex flex-col">
        {showSearch ? searchResultComponents : <></>}
      </div>
    </div>
  )
}

export default SearchBar
