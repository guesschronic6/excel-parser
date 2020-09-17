import { useForkRef } from "@material-ui/core";
import { Month } from "../../enums";

class LoadProfile_Raw {
  kwdel: number;
  hour: number;
  day: number;
  month: Month;
  year: number;
  minute: number;
  meteringPoint: string;
  row: number;

  constructor(
    kwdel: number,
    day: number,
    month: Month,
    year: number,
    hour: number,
    minute: number,
    meteringPoint: string,
    row: number
  ) {
    this.kwdel = kwdel;
    this.day = day;
    this.hour = hour;
    this.month = month;
    this.year = year;
    this.minute = minute;
    this.meteringPoint = meteringPoint;
    this.row = row;
    if (this.day === 26 && this.hour !== 0) {
      this.month = this.month++ % 12;
      if (this.month === 0) {
        this.month = 12;
      }
    }

    if (this.hour === 0 && this.minute === 0) {
      this.hour = 24;
    } else if (this.minute > 0) {
      this.hour = (this.hour + 1) % 25;
    }
  }
}

export default LoadProfile_Raw;
