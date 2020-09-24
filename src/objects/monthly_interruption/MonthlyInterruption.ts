import { loadSettings, saveSettings } from "./MonthlyInterruptionSettings";
import { extractRawDatasFromWorkbook } from "./MonthlyInterruptionExcelUtil";
import { MonthlyInterruptionObject, MonthlyInterruptionRawData } from "./types";
import { addToObject } from "./MonthlyInterruptionUtil";
import BillingPeriod from "../common/BillingPeriod";

const MonthlyInterruption = Object.freeze({
  saveSettings,
  loadSettings,
  createRawDataObject,
  createObject,
  utils: {
    extractRawDatasFromWorkbook,
    addToObject,
  },
});

function createObject(
  rawData: MonthlyInterruptionRawData
): MonthlyInterruptionObject {
  return {
    feeder: rawData.feeder,
    duration: rawData.duration,
  };
}

function createRawDataObject(
  duration: number,
  feeder: string,
  date: Date
): MonthlyInterruptionRawData {
  let billingMonth = BillingPeriod.getBillingMonth(
    date.getMonth() + 1,
    date.getDay()
  );

  let billingPeriod = new BillingPeriod(billingMonth, date.getFullYear());
  return {
    duration,
    feeder,
    date,
    billingPeriod,
  };
}

export default MonthlyInterruption;
