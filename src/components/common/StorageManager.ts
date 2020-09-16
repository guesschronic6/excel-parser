enum LoadProfileStorageKey {
  KWDEL = "lp_kwdelCol",
  DATE = "lp_dateCol",
  TIME = "lp_timeCol",
  DATE_FORMAT = "lp_dateFormat",
}

class LoadProfileSettings {
  kwdelCol: number;
  dateCol: number;
  timeCol: number;
  dateFormat: string;

  constructor() {
    this.kwdelCol = Number(
      localStorage.getItem(LoadProfileStorageKey.KWDEL) || "1"
    );
    this.dateCol = Number(
      localStorage.getItem(LoadProfileStorageKey.DATE) || "2"
    );
    this.timeCol = Number(
      localStorage.getItem(LoadProfileStorageKey.TIME) || "3"
    );
    this.dateFormat =
      localStorage.getItem(LoadProfileStorageKey.DATE_FORMAT) || "MM/dd/yyyy";
  }

  save() {
    if (this.kwdelCol) {
      localStorage.setItem(LoadProfileStorageKey.KWDEL, String(this.kwdelCol));
    }

    if (this.timeCol) {
      localStorage.setItem(LoadProfileStorageKey.TIME, String(this.timeCol));
    }

    if (this.dateCol) {
      localStorage.setItem(LoadProfileStorageKey.DATE, String(this.dateCol));
    }

    if (this.dateFormat) {
      localStorage.setItem(
        LoadProfileStorageKey.DATE_FORMAT,
        String(this.dateFormat)
      );
    }
  }
}

export { LoadProfileSettings };
