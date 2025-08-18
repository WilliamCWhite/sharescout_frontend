import { getStockData } from "../lib/db"
import { useDraggable } from "@dnd-kit/core"


interface TickerProps {
  ticker: string
}

function LibraryTicker(props: TickerProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.ticker,
  })

  const style = transform ? {
    transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`
  } : undefined

  async function handleClick() {
    const result = await getStockData(props.ticker)
    console.log(result)
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="bg-blue-300" onMouseDown={handleClick}>
      {props.ticker}
    </div>
  )
}

export default LibraryTicker
