import { useDraggable } from "@dnd-kit/core"
import { getTickerDataFromDB } from "../lib/db"


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
    if (true) return
    const result = await getTickerDataFromDB(props.ticker)
    console.log(result)
  }

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes} className="bg-blue-300" onMouseDown={handleClick}>
      {props.ticker}
    </div>
  )
}

export default LibraryTicker
