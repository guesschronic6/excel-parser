import LoadProfile_Hour from "./LoadProfile_Hour";
import LoadProfile_Raw from "./LoadProfile_Raw";

class LoadProfile_Day {
  day: number;
  loadProfile_hour: LoadProfile_Hour[];

  constructor(day: number) {
    this.day = day;
    this.loadProfile_hour = [];
    this.populateLoadProfileHour();
  }

  private populateLoadProfileHour(): void {
    for (let hour = 0; hour < 12; hour++) {
      this.loadProfile_hour.push(new LoadProfile_Hour(hour));
    }
  }

  addLoadProfileData(rawData: LoadProfile_Raw) {
    this.loadProfile_hour[rawData.hour].addKwdel(rawData.kwdel);
  }
}

export default LoadProfile_Day;
