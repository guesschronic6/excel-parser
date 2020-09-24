import { MonthlyInterruptionRawData, MonthlyInterruptionObject } from "./types";

function addToObject(
  monthlyInterruptionRawData: MonthlyInterruptionRawData,
  monthlyInterruptionObj: MonthlyInterruptionObject
) {
  if (monthlyInterruptionRawData.feeder === monthlyInterruptionObj.feeder) {
    monthlyInterruptionObj.duration += monthlyInterruptionRawData.duration;
  }
}

export { addToObject };
