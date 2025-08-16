import { RangeSetting, type DateRange } from "./interfaces";
 
export function generateRange(rangeSetting: RangeSetting): DateRange {
  const now = new Date()
  const then = new Date()
  then.setUTCHours(13, 30, 0, 0) // When stock market opens

  // if its before when the market opens in the day, set then to the start of the day before
  if (now.getTime() < then.getTime()) {
    then.setDate(then.getDate() - 1)
  }

  switch (rangeSetting) {
    case RangeSetting.OneDay:
      break;
    case RangeSetting.FiveDay:
      // since all of these are based on now, don't have to worry about anything with then.
      then.setDate(now.getDate() - 7)
      break;
    case RangeSetting.OneMonth:
      then.setMonth(now.getMonth() - 1)
      break;
    case RangeSetting.ThreeMonth:
      then.setMonth(now.getMonth() - 3)
      break;
    case RangeSetting.SixMonth:
      then.setMonth(now.getMonth() - 6)
      break;
    case RangeSetting.YTD:
      then.setMonth(0)
      then.setDate(1)
      break;
    case RangeSetting.OneYear:
      then.setFullYear(now.getFullYear() - 1)
      break;
    case RangeSetting.TwoYear:
      then.setFullYear(now.getFullYear() - 2)
      break;
    case RangeSetting.FiveYear:
      then.setFullYear(now.getFullYear() - 5)
      break;
    default:
      then.setDate(now.getDate() - 1)
  }

  return {startDate: then, endDate: now}
}
