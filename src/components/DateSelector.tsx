import { generateRange } from "../lib/generateRanges";
import { RangeSetting } from "../lib/interfaces";
import { useEffect, useState } from "react";

interface DateSelectorProps {
  setActiveRange: any;
}

function DateSelector(props: DateSelectorProps) {
  const [rangeSetting, setRangeSetting] = useState<RangeSetting>(RangeSetting.OneMonth)

  useEffect(() => {
    props.setActiveRange(generateRange(rangeSetting))
  }, [rangeSetting])

  return (
    <div className="flex">
      <section className="flex">
        <button onClick={() => {setRangeSetting(RangeSetting.OneDay)}}>1d</button>
        <button onClick={() => {setRangeSetting(RangeSetting.FiveDay)}}>5d</button>
        <button onClick={() => {setRangeSetting(RangeSetting.OneMonth)}}>1m</button>
        <button onClick={() => {setRangeSetting(RangeSetting.ThreeMonth)}}>3m</button>
        <button onClick={() => {setRangeSetting(RangeSetting.SixMonth)}}>6m</button>
        <button onClick={() => {setRangeSetting(RangeSetting.YTD)}}>YTD</button>
        <button onClick={() => {setRangeSetting(RangeSetting.OneYear)}}>1y</button>
        <button onClick={() => {setRangeSetting(RangeSetting.TwoYear)}}>2y</button>
        <button onClick={() => {setRangeSetting(RangeSetting.FiveYear)}}>5y</button>
      </section>
    </div>
  );
}

export default DateSelector;
