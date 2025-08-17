import { generateCustomRange, generateSetRange, getInitialCustomEnd, getInitialCustomStart, isStartValid, isEndValid } from "../lib/generateRanges";
import { RangeSetting } from "../lib/interfaces";
import { useEffect, useState } from "react";

interface DateSelectorProps {
  setActiveRange: any;
}

function DateSelector(props: DateSelectorProps) {
  const [rangeSetting, setRangeSetting] = useState<RangeSetting>(RangeSetting.OneMonth)

  // TODO: Since some resolutions will be too low, create error screen or just
  // enforce a week long gap and a month long gap for valid dates
  const [customStartDate, setCustomStartDate] = useState<string>(getInitialCustomStart())
  const [customEndDate, setCustomEndDate] = useState<string>(getInitialCustomEnd())

  // Change active range when range setting changes
  useEffect(() => {
    if (rangeSetting === RangeSetting.Custom) {
      props.setActiveRange(generateCustomRange(customStartDate, customEndDate))
      return
    }
    props.setActiveRange(generateSetRange(rangeSetting))
  }, [rangeSetting])

  // If custom is selected, change active range when the bounds change
  useEffect(() => {
    if (rangeSetting === RangeSetting.Custom) {
      props.setActiveRange(generateCustomRange(customStartDate, customEndDate))
    }
  }, [customStartDate, customEndDate])

  function handleStartChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (isStartValid(e.target.value, customEndDate)) {
      setCustomStartDate(e.target.value);
    }
  };

  function handleEndChange (e: React.ChangeEvent<HTMLInputElement>) {
    if (isEndValid(customStartDate, e.target.value)) {
      setCustomEndDate(e.target.value);
    }
  };

  function handleCustomClick() {
    setRangeSetting(RangeSetting.Custom)
  }

  return (
    <div className="flex justify-between">
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
      <section className="flex" onClick={handleCustomClick}>
        <p>Custom:</p>
        <input type="date" value={customStartDate} onChange={handleStartChange} />
        <p>to</p>
        <input type="date" value={customEndDate} onChange={handleEndChange} />
      </section>
    </div>
  );
}

export default DateSelector;
