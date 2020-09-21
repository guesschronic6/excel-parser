import LoadProfile_Raw from "./LoadProfile_Raw";
import HourlyLoadProfile from "./HourlyLoadProfile";
import { LoadProfileMax, LoadProfileSum } from "../types";

class DailyLoadProfile {
  date: Date;
  hourlyLoadProfiles: HourlyLoadProfile[];
  max: { kwdel: number; hour: number };
  sum: number;

  constructor(date: Date) {
    this.date = date;
    this.hourlyLoadProfiles = this.buildHourlyLoadProfiles();
    this.max = { kwdel: 0, hour: 0 };
    this.sum = 0;
  }

  private buildHourlyLoadProfiles() {
    return [...Array(24).keys()].map((hour) => {
      return new HourlyLoadProfile(hour);
    });
  }

  addLoadProfileData(rawData: LoadProfile_Raw) {
    this.hourlyLoadProfiles[rawData.hour].addKwdel(
      rawData.kwdel,
      rawData.fileName
    );
  }

  removeLoadProfileData(fileName: string) {
    this.hourlyLoadProfiles.forEach((hourloadProfile) => {
      hourloadProfile.removeKwdel(fileName);
    });
  }

  genMaxAndSum() {
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
    this.max = { kwdel: maxKwdel, hour };
    this.sum = sum;
    return { max: this.max, sum: this.sum };
  }
}

export default DailyLoadProfile;
