import LoadProfile_Raw from "./LoadProfile_Raw";
import DailyLoadProfile from "./DailyLoadProfile";
import { LoadProfileMax, LoadProfileSum } from "../types";

class LoadProfile {
  meteringPoint: string;
  dailyLoadProfiles: Map<string, DailyLoadProfile>;
  max: LoadProfileMax;
  sum: LoadProfileSum;

  constructor(meteringPoint: string) {
    this.meteringPoint = meteringPoint;
    this.dailyLoadProfiles = new Map();
    this.max = { kwdel: 0, hour: 1, meteringPoint: "", date: new Date() };
    this.sum = { kwdel: 0, meteringPoint: "" };
  }

  addLoadProfileData(rawData: LoadProfile_Raw, dateString: string) {
    if (!this.dailyLoadProfiles.has(dateString)) {
      this.dailyLoadProfiles.set(
        dateString,
        new DailyLoadProfile(new Date(dateString))
      );
    }
    this.dailyLoadProfiles.get(dateString)?.addLoadProfileData(rawData);
  }

  removeLoadPRofileData(fileName: string) {
    this.dailyLoadProfiles.forEach((dailyLoadProfile) => {
      dailyLoadProfile.removeLoadProfileData(fileName);
    });
  }

  getDailyLoadProfile(dateString: string): DailyLoadProfile {
    return this.dailyLoadProfiles.has(dateString)
      ? (this.dailyLoadProfiles.get(dateString) as DailyLoadProfile)
      : new DailyLoadProfile(new Date(dateString));
  }

  getMaxAndSum(): {
    max: LoadProfileMax;
    sum: LoadProfileSum;
  } {
    let max = 0;
    let sum = 0;
    let maxHour = 1;
    let maxDate = new Date();

    for (let dailyLoadProfile of this.dailyLoadProfiles.values()) {
      const { max: lpMax, sum: lpSum } = dailyLoadProfile.getMaxAndSum();
      if (lpMax.kwdel > max) {
        max = lpMax.kwdel;
        maxHour = lpMax.hour;
        maxDate = dailyLoadProfile.date;
        sum += lpSum.kwdel;
      }
    }

    this.max = {
      kwdel: max,
      hour: maxHour,
      date: maxDate,
      meteringPoint: this.meteringPoint,
    };
    this.sum = { kwdel: sum, meteringPoint: this.meteringPoint };

    return {
      max: this.max,
      sum: this.sum,
    };
  }
}

export default LoadProfile;
