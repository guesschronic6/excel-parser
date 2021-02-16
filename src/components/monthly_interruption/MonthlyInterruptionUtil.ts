import BillingPeriod from "../common/object/BillingPeriod";
import { Feeder } from "../common/object";
import {
  MonthlyInterruptionRawData,
  MonthlyInterruptionSettings,
} from "./types";

function createRawDataObject(
  duration: number,
  feeder: Feeder,
  date: Date,
  fileName: string
): MonthlyInterruptionRawData {
  let billingMonth = BillingPeriod.getBillingMonth(
    date.getMonth() + 1,
    date.getDay()
  );

  let billingPeriod = new BillingPeriod(billingMonth, date.getFullYear());
  return {
    duration,
    feeder: feeder,
    date,
    billingPeriod,
    fileName,
  };
}

enum MonthlyInterruptionSettingsKey {
  DATE = "mis_date",
  DURATION = "mis_duration",
  DATE_FORMAT = "mis_dateformat",
  FEEDER = "mis_feeder",
}

function loadSettings(): MonthlyInterruptionSettings {
  return {
    dateCol:
      Number(localStorage.getItem(MonthlyInterruptionSettingsKey.DATE)) || 0,
    durationCol:
      Number(localStorage.getItem(MonthlyInterruptionSettingsKey.DURATION)) ||
      1,
    dateFormat:
      localStorage.getItem(MonthlyInterruptionSettingsKey.DATE_FORMAT) ||
      "MM/DD/YYYY",

    feederCol:
      Number(localStorage.getItem(MonthlyInterruptionSettingsKey.FEEDER)) || 2,
  };
}

function saveSettings(settings: MonthlyInterruptionSettings) {
  localStorage.setItem(
    MonthlyInterruptionSettingsKey.DATE,
    settings.dateCol.toString()
  );
  localStorage.setItem(
    MonthlyInterruptionSettingsKey.DURATION,
    settings.durationCol.toString()
  );
  localStorage.setItem(
    MonthlyInterruptionSettingsKey.DATE_FORMAT,
    settings.dateFormat
  );
  localStorage.setItem(
    MonthlyInterruptionSettingsKey.FEEDER,
    settings.feederCol.toString()
  );
}

const MonthlyInterruptionUtil = Object.freeze({
  createRawDataObject,
  saveSettings,
  loadSettings,
});

export default MonthlyInterruptionUtil;
