import BillingPeriod from "../../common/object/BillingPeriod";
import FeederAndDemand from "./FeederAndDemand";

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

  addFeederAndDemandIfNotExists(billingPeriod: BillingPeriod) {
    let key = billingPeriod.toString();
    if (!this.feederAndDemands.has(key)) {
      this.feederAndDemands.set(key, new FeederAndDemand(billingPeriod));
    }
    return this.feederAndDemands.get(key) as FeederAndDemand;
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
