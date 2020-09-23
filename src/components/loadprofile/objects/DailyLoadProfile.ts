import LoadProfile_Raw from "./LoadProfile_Raw";
import HourlyLoadProfile from "./HourlyLoadProfile";
import { LoadProfileMax, LoadProfileSum } from "../types";

class DailyLoadProfile {
  date: Date;
  hourlyLoadProfiles: HourlyLoadProfile[];
  max: { kwdel: number; hour: number };
  sum: { kwdel: number; kwhdel: number };

  constructor(date: Date) {
    this.date = date;
    this.hourlyLoadProfiles = this.buildHourlyLoadProfiles();
    this.max = { kwdel: 0, hour: 0 };
    this.sum = { kwdel: 0, kwhdel: 0 };
  }

  private buildHourlyLoadProfiles() {
    return [...Array(24).keys()].map((hour) => {
      return new HourlyLoadProfile(hour);
    });
  }

  addLoadProfileData(rawData: LoadProfile_Raw) {
    this.hourlyLoadProfiles[rawData.hour].addKwdel(
      rawData.kwdel,
      rawData.kwhdel,
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
    let kwdelSum = 0;
    let kwhdelSum = 0;
    for (let hourlyLoadProfile of this.hourlyLoadProfiles) {
      let kwdel = hourlyLoadProfile.getTotalKwdel();
      kwdelSum += kwdel;
      kwhdelSum += hourlyLoadProfile.getTotalKwhdel();
      if (kwdel > maxKwdel) {
        hour = hourlyLoadProfile.hour;
        maxKwdel = kwdel;
      }
    }
    this.max = { kwdel: maxKwdel, hour };
    this.sum = { kwdel: kwdelSum, kwhdel: kwhdelSum };
    return { max: this.max, sum: this.sum };
  }
}

export default DailyLoadProfile;
