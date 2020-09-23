import moment from "moment";
import { Month } from "../../components/enums";

class BillingPeriod {
  month: number;
  year: number;
  startDate: Date;
  enddDate: Date;

  constructor(month: number, year: number) {
    this.month = month;
    this.year = year;
    this.startDate = this.getStartDate();
    this.enddDate = this.getEndDate();
  }

  static getBillingMonth(
    month: number,
    day: number,
    minute: number = 1,
    hour: number = 0
  ) {
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

  private getStartDate() {
    let startMonth = this.month === 1 ? 12 : this.month - 1;
    let startYear = this.month === 1 ? this.year - 1 : this.year;
    return moment(`${startMonth}/26/${startYear}`, "MM/DD/YYYY").toDate();
  }

  private getEndDate() {
    return moment(`${this.month}/25/${this.year}`, "MM/DD/YYYY").toDate();
  }

  equalsTo(billingPeriod: BillingPeriod): boolean {
    if (
      this.month === null ||
      billingPeriod == null ||
      billingPeriod.month === null
    ) {
      return false;
    }
    return (
      this.month === billingPeriod.month && this.year === billingPeriod.year
    );
  }

  toString() {
    return `${Month[this.month - 1]} ${this.year}`;
  }
}

export default BillingPeriod;
