import { useDroppable } from "@dnd-kit/core"

function SeriesBox() {
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable'
  })
  let classes = ""
  if (isOver) {
    classes = "bg-green-300"
  }
  return (
    <div ref={setNodeRef} className={`bg-red-300 ${classes}`}>
      Hello
    </div>

  )

}

export default SeriesBox
