import { BillingPeriod, Month } from "../../common/object";

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
    let billingMonth = BillingPeriod.getBillingMonth(
      this.month,
      this.day,
      this.hour,
      this.minute
    );

    this.billingPeriod = new BillingPeriod(billingMonth, this.year);

    if (this.minute === 0) {
      this.hour--;
      if (this.hour < 0) {
        this.hour = 23;
      }
    }
  }
}

export default LoadProfile_Raw;
