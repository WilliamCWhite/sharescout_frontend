interface SeriesTickerProps {
  ticker: string;
  deleteSelf: () => void;
}
function SeriesTicker(props: SeriesTickerProps) {
  return (
    <div className="bg-yellow-400">
      <p>{props.ticker}</p>
      <button onClick={props.deleteSelf}>Delete</button>
    </div>
  );
}

export default SeriesTicker;
