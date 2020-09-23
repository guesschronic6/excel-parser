import { loadSettings, saveSettings } from "./MonthlyInterruptionSettings";
import { extractRawDatasFromWorkbook } from "./MonthlyInterruptionExcelUtil";
import { MonthlyInterruptionRawData } from "./types";
import BillingPeriod from "../common/BillingPeriod";

const MonthlyInterruption = Object.freeze({
  extractRawDatasFromWorkbook,
  saveSettings,
  loadSettings,
  createRawDataObject,
});

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
