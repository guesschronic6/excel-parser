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
    for (let hour = 1; hour <= 24; hour++) {
      this.loadProfile_hour.push(new LoadProfile_Hour(hour));
    }
  }

  addLoadProfileData(rawData: LoadProfile_Raw) {
    console.log("Updating hour data of day: " + this.day);
    this.loadProfile_hour[rawData.hour - 1].addKwdel(rawData.kwdel);
  }
}

export default LoadProfile_Day;
