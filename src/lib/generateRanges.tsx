import { RangeSetting, type DateRange } from "./interfaces";
 
export function generateSetRange(rangeSetting: RangeSetting): DateRange {
  const end = new Date()

  if (end.getUTCDay() === 0) { // push sun to friday
    end.setUTCDate(end.getUTCDate() - 2)
  } else if (end.getUTCDay() === 6) { // push sat to friday
    end.setUTCDate(end.getUTCDate() - 1)
  }

  const start = new Date(end.getTime())
  end.setDate(end.getDate() + 1)
  end.setUTCHours(0, 0, 0, 0)
  start.setUTCHours(0, 0, 0, 0)

  switch (rangeSetting) {
    case RangeSetting.OneDay:
      break;
    case RangeSetting.FiveDay:
      // since all of these are based on now, don't have to worry about anything with then.
      start.setDate(end.getDate() - 6)
      break;
    case RangeSetting.OneMonth:
      start.setDate(end.getDate() + 1)
      start.setMonth(end.getMonth() - 1)
      break;
    case RangeSetting.ThreeMonth:
      start.setDate(end.getDate() + 1)
      start.setMonth(end.getMonth() - 3)
      break;
    case RangeSetting.SixMonth:
      start.setDate(end.getDate() + 1)
      start.setMonth(end.getMonth() - 6)
      break;
    case RangeSetting.YTD:
      start.setMonth(0)
      start.setDate(1)
      break;
    case RangeSetting.OneYear:
      start.setDate(end.getDate() + 1)
      start.setFullYear(end.getFullYear() - 1)
      break;
    case RangeSetting.TwoYear:
      start.setDate(end.getDate() + 1)
      start.setFullYear(end.getFullYear() - 2)
      break;
    case RangeSetting.FiveYear:
      start.setDate(end.getDate() + 1)
      start.setFullYear(end.getFullYear() - 5)
      break;
    default:
  }

  return {startDate: start, endDate: end}
}

export function getInitialCustomStart(): string {
  const then = new Date()
  then.setDate(then.getDate() - 18)

  return then.toISOString().split("T")[0]
}

export function getInitialCustomEnd(): string {
  const then = new Date()

  return then.toISOString().split("T")[0]
}

export function generateCustomRange(startString: string, endString: string): DateRange {
  let [year, month, day] = startString.split("-").map(Number);
  const startDate = new Date(year, month - 1, day);
  startDate.setUTCHours(13, 30, 0, 0);
  
  [year, month, day] = endString.split("-").map(Number);
  const endDate = new Date(year, month - 1, day);
  endDate.setUTCHours(20, 0, 0, 0);

  return {startDate: startDate, endDate: endDate}
}

export function isStartValid(startString: string, endString: string): boolean {
  const range = generateCustomRange(startString, endString)
  if (range.startDate.getTime() > range.endDate.getTime()) {
    return false
  }
  
  const now = new Date()

  if (range.startDate.getTime() > now.getTime()) {
    return false
  }

  return true
}

export function isEndValid(startString: string, endString: string): boolean {
  const range = generateCustomRange(startString, endString)
  if (range.endDate.getTime() < range.startDate.getTime()) {
    return false
  }
  
  const endOfToday = new Date()
  endOfToday.setUTCHours(21, 0, 0, 0)

  if (range.endDate.getTime() > endOfToday.getTime()) {
    return false
  }

  return true
}
