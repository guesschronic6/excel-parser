import BillingPeriod from "../common/BillingPeriod";
import MonthlyInterruptionItem from "../monthly_interruption/MonthlyInterruptionItem";
import PowerSubstationItem from "../power_substation/PowerSubstationItem";
import FeederAndDemandItem from "./FeederAndDemandItem";

class FeederAndDemand {
  billingPeriod: BillingPeriod;

  items: Map<string, FeederAndDemandItem>;
  totalOperatingHours: number;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.items = new Map();
    this.totalOperatingHours = billingPeriod.getTotalDays() * 24;
    console.log("FeederAndDemand Created");
  }

  addMonthlyInterruptionData(data: MonthlyInterruptionItem) {
    let key = data.feeder;
    if (!this.items.has(key)) {
      console.log(
        "addMonthlyInterruptionData(), adding new item, feeder:" + key
      );
      this.items.set(
        key,
        new FeederAndDemandItem(data.feeder, this.totalOperatingHours)
      );
    }
    this.items.get(key)?.setMonthlyInterruptionData(data);
  }

  addPowerSubstationData(data: PowerSubstationItem) {
    let key = data.feeder;
    if (!this.items.has(key)) {
      console.log("addPowerSubstationData(), adding new item, feeder:" + key);
      this.items.set(
        key,
        new FeederAndDemandItem(data.feeder, this.totalOperatingHours)
      );
    }
    this.items.get(key)?.setPowerSubstationData(data);
  }
}

export default FeederAndDemand;
