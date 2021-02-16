import { LoadProfileSettings } from "./objects/types";
enum LoadProfileStorageKey {
  KWDEL = "lp_kwdelCol",
  KWHDEL = "lp_kwhdelCol",
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
    localStorage.getItem(LoadProfileStorageKey.DATE_FORMAT) || "MM/DD/YYYY";
  let timeFormat =
    localStorage.getItem(LoadProfileStorageKey.TIME_FORMAT) || "HH:mm";

  let kwhdelCol = Number(
    localStorage.getItem(LoadProfileStorageKey.KWHDEL) || "4"
  );
  return {
    kwdelCol,
    dateCol,
    timeCol,
    dateFormat,
    timeFormat,
    kwhdelCol,
  };
}

function saveSettings(settings: LoadProfileSettings): void {
  localStorage.setItem(LoadProfileStorageKey.KWDEL, String(settings.kwdelCol));

  localStorage.setItem(LoadProfileStorageKey.TIME, String(settings.timeCol));

  localStorage.setItem(LoadProfileStorageKey.DATE, String(settings.dateCol));

  localStorage.setItem(
    LoadProfileStorageKey.DATE_FORMAT,
    String(settings.dateFormat)
  );

  localStorage.setItem(
    LoadProfileStorageKey.TIME_FORMAT,
    String(settings.timeFormat)
  );

  localStorage.setItem(
    LoadProfileStorageKey.KWHDEL,
    settings.kwhdelCol.toString()
  );
}

const LoadProfileStorage = {
  loadSettings,
  saveSettings,
};

export default LoadProfileStorage;
