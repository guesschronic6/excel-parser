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
    console.log("Monthly feeder and demand created");
  }

  addMonthlyInterruptionData(
    data: MonthlyInterruptionItem,
    billingPeriod: BillingPeriod
  ) {
    this.addIfNotExist(billingPeriod);
    this.feederAndDemands
      .get(billingPeriod.toString())
      ?.addMonthlyInterruptionData(data);
  }

  addPowerSubstationData(
    data: PowerSubstationItem,
    billingPeriod: BillingPeriod
  ) {
    this.addIfNotExist(billingPeriod);
    this.feederAndDemands
      .get(billingPeriod.toString())
      ?.addPowerSubstationData(data);
  }

  private addIfNotExist(billingPeriod: BillingPeriod) {
    let key = billingPeriod.toString();
    if (!this.feederAndDemands.has(key)) {
      this.feederAndDemands.set(key, new FeederAndDemand(billingPeriod));
    }
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
