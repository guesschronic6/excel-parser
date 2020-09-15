import { Month } from "../../enums";
import LoadProfile_Day from "./LoadProfile_Day";

class LoadProfile_Month {
  month: Month;
  year: number;
  loadProfileDays: LoadProfile_Day[];

  constructor(month: Month, year: number) {
    this.month = month;
    this.year = year;
    this.loadProfileDays = [];
  }
}

export default LoadProfile_Month;
