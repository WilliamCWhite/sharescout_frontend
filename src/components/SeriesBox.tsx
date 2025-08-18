import { useDroppable } from "@dnd-kit/core";
import SeriesTicker from "./SeriesTicker";

interface SeriesBoxProps {
  seriesIndex: number;
  seriesTickerList: string[];
  removeTickerFromList: (index: number, ticker: string) => void;
}

function SeriesBox(props: SeriesBoxProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `series-${props.seriesIndex}`,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  const seriesTickerComponents = props.seriesTickerList.map(
    (ticker: string) => {
      return (
        <SeriesTicker
          key={ticker}
          ticker={ticker}
          deleteSelf={() => {
            props.removeTickerFromList(props.seriesIndex, ticker);
          }}
        />
      );
    },
  );

  return (
    <div ref={setNodeRef} className={`bg-red-300 w-40 h-40`} style={style}>
      Hello
      {seriesTickerComponents}
    </div>
  );
}

export default SeriesBox;
