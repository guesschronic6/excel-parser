import { Month } from "../../enums";

class LoadProfile_Raw {
  kwdel: number;
  hour: number;
  day: number;
  month: Month;
  year: number;
  minute: number;

  constructor(
    kwdel: number,
    day: number,
    month: Month,
    year: number,
    hour: number,
    minute: number
  ) {
    this.kwdel = kwdel;
    this.day = day;
    this.hour = hour;
    this.month = month;
    this.year = year;
    this.minute = minute;
  }
}

export default LoadProfile_Raw;
