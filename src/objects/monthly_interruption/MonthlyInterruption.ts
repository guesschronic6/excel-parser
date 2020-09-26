import BillingPeriod from "../common/BillingPeriod";
import Feeder from "../common/enums/Feeder";
import MonthlyInterruptionItem from "./MonthlyInterruptionItem";
import { MonthlyInterruptionRawData } from "./types";

class MonthlyInterruption {
  billingPeriod: BillingPeriod;
  items: Map<Feeder, MonthlyInterruptionItem>;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.items = new Map();
  }

  addRawData(rawData: MonthlyInterruptionRawData) {
    let key = rawData.feeder;
    if (!this.items.has(key)) {
      this.items.set(key, new MonthlyInterruptionItem(rawData.feeder));
    }
    this.items.get(key)?.addDuration(rawData.duration, rawData.fileName);
  }

  removeFile(fileName: string) {
    this.items.forEach((item) => {
      item.removeFile(fileName);
    });
  }
}

export default MonthlyInterruption;
