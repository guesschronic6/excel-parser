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

  constructor(
    kwdel: number,
    day: number,
    month: Month,
    year: number,
    hour: number,
    minute: number,
    meteringPoint: string
  ) {
    this.kwdel = kwdel;
    this.day = day;
    this.hour = hour;
    this.month = month;
    this.year = year;
    this.minute = minute;
    this.meteringPoint = meteringPoint;
    if (this.hour === 0 && this.minute === 0) {
      this.hour = 24;
    } else if (this.minute > 0) {
      this.hour = (this.hour + 1) % 25;
    }
  }
}

export default LoadProfile_Raw;
