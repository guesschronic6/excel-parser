import { MonthlyInterruptionSettings } from "./types";

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

export { loadSettings, saveSettings };
