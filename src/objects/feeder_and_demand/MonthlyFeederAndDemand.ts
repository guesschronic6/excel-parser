import BillingPeriod from "../common/BillingPeriod";
import MonthlyInterruptionItem from "../monthly_interruption/MonthlyInterruptionItem";
import MonthlyMonthlyInterruption from "../monthly_interruption/MonthlyMonthlyInterruption";
import PowerSubstationItem from "../power_substation/PowerSubstationItem";
import FeederAndDemand from "./FeederAndDemand";
import FeederAndDemandItem from "./FeederAndDemandItem";

class MonthlyFeederAndDemand {
  feederAndDemands: Map<string, FeederAndDemand>;

  constructor(monthlyFeederAndDemand?: MonthlyFeederAndDemand) {
    if (monthlyFeederAndDemand) {
      this.feederAndDemands = new Map(monthlyFeederAndDemand.feederAndDemands);
    } else {
      this.feederAndDemands = new Map();
    }
    console.trace("Monthly feeder and demand created");
  }

  addMonthlyInterruptionData(
    data: MonthlyInterruptionItem,
    billingPeriod: BillingPeriod
  ) {
    let key = billingPeriod.toString();
    if (!this.feederAndDemands.has(key)) {
      console.log(
        "addMonthlyInterruptionData(), adding new feeder and demand, billing period: " +
          billingPeriod.toString()
      );
      this.feederAndDemands.set(key, new FeederAndDemand(billingPeriod));
    }
    this.feederAndDemands.get(key)?.addMonthlyInterruptionData(data);
  }

  addPowerSubstationData(
    data: PowerSubstationItem,
    billingPeriod: BillingPeriod
  ) {
    let key = billingPeriod.toString();
    if (!this.feederAndDemands.has(key)) {
      console.log(
        "addPowerSubstationData(), adding new feeder and demand, billing period: " +
          billingPeriod.toString()
      );
      this.feederAndDemands.set(key, new FeederAndDemand(billingPeriod));
    }
    this.feederAndDemands.get(key)?.addPowerSubstationData(data);
  }

  initValues() {
    for (let feederAndDemand of this.feederAndDemands.values()) {
      for (let item of feederAndDemand.items.values()) {
        item.recalculateData();
      }
    }
  }
}

export default MonthlyFeederAndDemand;
