import { LoadProfileSettings } from "./types/LoadProfileSettings";
enum LoadProfileStorageKey {
  KWDEL = "lp_kwdelCol",
  DATE = "lp_dateCol",
  TIME = "lp_timeCol",
  DATE_FORMAT = "lp_dateFormat",
  TIME_FORMAT = "lp_timeFormat",
}

function loadSettings(): LoadProfileSettings {
  let kwdelCol = Number(
    localStorage.getItem(LoadProfileStorageKey.KWDEL) || "1"
  );
  let dateCol = Number(localStorage.getItem(LoadProfileStorageKey.DATE) || "2");
  let timeCol = Number(localStorage.getItem(LoadProfileStorageKey.TIME) || "3");
  let dateFormat =
    localStorage.getItem(LoadProfileStorageKey.DATE_FORMAT) || "MM/dd/yyyy";
  let timeFormat =
    localStorage.getItem(LoadProfileStorageKey.TIME_FORMAT) || "HH:mm";
  return {
    kwdelCol,
    dateCol,
    timeCol,
    dateFormat,
    timeFormat,
  };
}

function saveSettings(settings: LoadProfileSettings): void {
  if (settings.kwdelCol) {
    localStorage.setItem(
      LoadProfileStorageKey.KWDEL,
      String(settings.kwdelCol)
    );
  }

  if (settings.timeCol) {
    localStorage.setItem(LoadProfileStorageKey.TIME, String(settings.timeCol));
  }

  if (settings.dateCol) {
    localStorage.setItem(LoadProfileStorageKey.DATE, String(settings.dateCol));
  }

  if (settings.dateFormat) {
    localStorage.setItem(
      LoadProfileStorageKey.DATE_FORMAT,
      String(settings.dateFormat)
    );
  }

  if (settings.timeFormat) {
    localStorage.setItem(
      LoadProfileStorageKey.TIME_FORMAT,
      String(settings.timeFormat)
    );
  }
}

const LoadProfileStorage = {
  loadSettings,
  saveSettings,
};

export default LoadProfileStorage;
