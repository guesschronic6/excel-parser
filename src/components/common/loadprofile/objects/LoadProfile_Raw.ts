import { Month } from "../../enums";

class LoadProfile_Raw {
  kwdel: number;
  hour: number;
  day: number;
  month: Month;
  year: number;

  constructor(
    kwdel: number,
    day: number,
    month: Month,
    year: number,
    hour: number
  ) {
    this.kwdel = kwdel;
    this.day = day;
    this.hour = hour;
    this.month = month;
    this.year = year;
  }
}

export default LoadProfile_Raw;
