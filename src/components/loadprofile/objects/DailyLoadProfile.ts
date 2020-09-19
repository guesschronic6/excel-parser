import LoadProfile_Raw from "./LoadProfile_Raw";
import HourlyLoadProfile from "./HourlyLoadProfile";
import { LoadProfileMax, LoadProfileSum } from "../types";

class DailyLoadProfile {
  date: Date;
  hourlyLoadProfiles: HourlyLoadProfile[];

  constructor(date: Date) {
    this.date = date;
    this.hourlyLoadProfiles = this.buildHourlyLoadProfiles();
  }

  private buildHourlyLoadProfiles() {
    return [...Array(24).keys()].map((hour) => {
      return new HourlyLoadProfile(hour);
    });
  }

  addLoadProfileData(rawData: LoadProfile_Raw) {
    this.hourlyLoadProfiles[rawData.hour].addKwdel(rawData.kwdel);
  }

  getMaxAndSum(): {
    max: LoadProfileMax;
    sum: LoadProfileSum;
  } {
    let maxKwdel = 0;
    let hour = 1;
    let sum = 0;

    for (let hourlyLoadProfile of this.hourlyLoadProfiles) {
      let kwdel = hourlyLoadProfile.getTotalKwdel();
      sum += kwdel;
      if (kwdel > maxKwdel) {
        hour = hourlyLoadProfile.hour;
        maxKwdel = kwdel;
      }
    }

    return {
      max: { kwdel: maxKwdel, hour, meteringPoint: "", date: new Date() },
      sum: { kwdel: sum, meteringPoint: "" },
    };
  }
}

export default DailyLoadProfile;
