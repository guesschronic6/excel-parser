import BillingPeriod from "../../../objects/common/BillingPeriod";
import { Month } from "../../enums";

class LoadProfile_Raw {
  kwdel: number;
  kwhdel: number;
  hour: number;
  day: number;
  month: Month;
  year: number;
  minute: number;
  meteringPoint: string;
  row: number;
  billingPeriod: BillingPeriod;
  fileName: string;

  constructor(
    kwdel: number,
    kwhdel: number,
    day: number,
    month: Month,
    year: number,
    hour: number,
    minute: number,
    meteringPoint: string,
    row: number,
    fileName: string = ""
  ) {
    this.kwdel = kwdel;
    this.kwhdel = kwhdel;
    this.day = day;
    this.hour = hour;
    this.month = month;
    this.year = year;
    this.minute = minute;
    this.meteringPoint = meteringPoint;
    this.row = row;
    this.fileName = fileName;
    if (this.hour === 0 && this.minute === 0) {
      this.hour = 23;
      this.minute = 59;
      if (this.day - 1 <= 0) {
        let date = new Date(`${this.year}/${this.month}/${this.day}`);
        date.setDate(date.getDate() - 1);
        this.day = date.getDate();
        this.month = date.getMonth() + 1;
        this.year = date.getFullYear();
      } else {
        this.day--;
      }
    }
    let billingMonth = this.getBillingMonth({
      month: this.month,
      day: this.day,
      hour: this.hour,
      minute: this.minute,
    });

    this.billingPeriod = new BillingPeriod(billingMonth, this.year);

    if (this.minute === 0) {
      this.hour--;
      if (this.hour < 0) {
        this.hour = 23;
      }
    }
  }

  getBillingMonth({
    month,
    day,
    minute,
    hour,
  }: {
    month: number;
    day: number;
    minute: number;
    hour: number;
  }) {
    let billingMonth = month;
    if (day >= 26) {
      if (!(hour === 0 && minute === 0 && day === 26)) {
        billingMonth = ++billingMonth % 12;
        if (billingMonth === 0) {
          billingMonth = 12;
        }
      }
    }
    return billingMonth;
  }
}

export default LoadProfile_Raw;
