import MonthlyInterruption from "./MonthlyInterruption";
import { MonthlyInterruptionRawData } from "./types";

class MonthlyMonthlyInterruption {
  monthlyInterruptions: Map<string, MonthlyInterruption>;

  constructor(monthlyMonthlyInterruption?: MonthlyMonthlyInterruption) {
    if (monthlyMonthlyInterruption) {
      this.monthlyInterruptions = new Map(
        monthlyMonthlyInterruption.monthlyInterruptions
      );
    } else {
      this.monthlyInterruptions = new Map();
    }
    console.log("MonthlyMonthly Interruption creaated...");
  }

  addRawData(rawData: MonthlyInterruptionRawData) {
    let key = rawData.billingPeriod.toString();
    if (!this.monthlyInterruptions.has(key)) {
      this.monthlyInterruptions.set(
        key,
        new MonthlyInterruption(rawData.billingPeriod)
      );
    }

    this.monthlyInterruptions.get(key)?.addRawData(rawData);
  }

  removeFile(fileName: string) {
    this.monthlyInterruptions.forEach((monthlyInterruption) => {
      monthlyInterruption.removeFile(fileName);
    });
  }
}

export default MonthlyMonthlyInterruption;
