import { useDroppable } from "@dnd-kit/core";
import type { SeriesTicker } from "../lib/interfaces";
import SeriesBoxTicker from "./SeriesBoxTicker";

interface SeriesBoxProps {
  seriesIndex: number;
  seriesTickerList: SeriesTicker[];
  removeTickerFromList: (index: number, ticker: string) => void;
  updateSeriesTickerInvestment: (index: number, ticker: string, newInvestment: number) => void;
}

function SeriesBox(props: SeriesBoxProps) {
  const { isOver, setNodeRef } = useDroppable({
    id: `series-${props.seriesIndex}`,
  });

  const style = {
    backgroundColor: isOver ? "green" : undefined,
  };

  function updateSelfInvestment(ticker: string, newInvestment: number) {
    props.updateSeriesTickerInvestment(props.seriesIndex, ticker, newInvestment)
  }

  const seriesTickerComponents = props.seriesTickerList.map(
    (seriesTicker: SeriesTicker) => {
      return (
        <SeriesBoxTicker
          key={seriesTicker.ticker}
          seriesTicker={seriesTicker}
          deleteSelf={() => {
            props.removeTickerFromList(props.seriesIndex, seriesTicker.ticker);
          }}
          updateSelfInvestment={updateSelfInvestment}
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
