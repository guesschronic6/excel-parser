enum LoadProfileStorageKey {
  KWDEL = "lp_kwdelCol",
  DATE = "lp_dateCol",
  TIME = "lp_timeCol",
  DATE_FORMAT = "lp_dateFormat",
}

function loadLoadProfileSettings(): {
  kwdelCol: number;
  dateCol: number;
  timeCol: number;
  dateFormat: string;
} {
  const kwdelCol = Number(
    localStorage.getItem(LoadProfileStorageKey.KWDEL) || "1"
  );
  const dateCol = Number(
    localStorage.getItem(LoadProfileStorageKey.DATE) || "2"
  );
  const timeCol = Number(
    localStorage.getItem(LoadProfileStorageKey.TIME) || "3"
  );
  const dateFormat =
    localStorage.getItem(LoadProfileStorageKey.DATE_FORMAT) || "MM/dd/yyyy";

  return {
    kwdelCol,
    dateCol,
    timeCol,
    dateFormat,
  };
}

function saveLoadProfileSettings(
  kwdelCol?: number,
  dateCol?: number,
  timeCol?: number,
  dateFormat?: string
) {
  if (kwdelCol) {
    localStorage.setItem(LoadProfileStorageKey.KWDEL, String(kwdelCol));
  }

  if (timeCol) {
    localStorage.setItem(LoadProfileStorageKey.TIME, String(timeCol));
  }

  if (dateCol) {
    localStorage.setItem(LoadProfileStorageKey.DATE, String(dateCol));
  }

  if (dateFormat) {
    localStorage.setItem(LoadProfileStorageKey.DATE_FORMAT, String(dateFormat));
  }
}

export { loadLoadProfileSettings, saveLoadProfileSettings };
