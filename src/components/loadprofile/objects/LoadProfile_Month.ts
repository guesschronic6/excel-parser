import { Month } from "../../enums";
import LoadProfile_Day from "./LoadProfile_Day";
import LoadProfile_Raw from "./LoadProfile_Raw";

class LoadProfile_Month {
  month: Month;
  year: number;
  loadProfileDays: LoadProfile_Day[];

  constructor(month: Month, year: number) {
    this.month = month;
    this.year = year;
    this.loadProfileDays = [];
    for (let day = 1; day <= this.daysInMonth(month, year); day++) {
      this.loadProfileDays.push(new LoadProfile_Day(day));
    }
  }

  addData(rawData: LoadProfile_Raw) {
    this.loadProfileDays[rawData.day - 1].addLoadProfileData(rawData);
  }

  // Month here is 1-indexed (January is 1, February is 2, etc). This is
  // because we're using 0 as the day so that it returns the last day
  // of the last month, so you have to add 1 to the month number
  // so it returns the correct amount of days
  private daysInMonth(month: number, year: number): number {
    return new Date(year, month, 0).getDate();
  }
}

export default LoadProfile_Month;
