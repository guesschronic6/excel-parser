import LoadProfile_Raw from "./LoadProfile_Raw";
import HourlyLoadProfile from "./HourlyLoadProfile";

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
}

export default DailyLoadProfile;
