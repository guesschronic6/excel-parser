import BillingPeriod from "../../common/object/BillingPeriod";
import Feeder from "../../common/object/Feeder";
import FeederAndDemandItem from "./FeederAndDemandItem";

class FeederAndDemand {
  billingPeriod: BillingPeriod;

  items: Map<Feeder, FeederAndDemandItem>;
  totalOperatingHours: number;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.items = new Map();
    this.totalOperatingHours = (billingPeriod.getTotalDays() + 1) * 24;
    console.log("FeederAndDemand Created");
  }

  addItemIfNotExistElseGet(feeder: Feeder) {
    if (!this.items.has(feeder)) {
      this.items.set(
        feeder,
        new FeederAndDemandItem(feeder, this.totalOperatingHours)
      );
    }

    return this.items.get(feeder) as FeederAndDemandItem;
  }
}

export default FeederAndDemand;
