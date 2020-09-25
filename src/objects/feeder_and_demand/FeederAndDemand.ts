import BillingPeriod from "../common/BillingPeriod";
import Feeder from "../common/enums/Feeder";
import MonthlyInterruptionItem from "../monthly_interruption/MonthlyInterruptionItem";
import PowerSubstationItem from "../power_substation/PowerSubstationItem";
import FeederAndDemandItem from "./FeederAndDemandItem";

class FeederAndDemand {
  billingPeriod: BillingPeriod;

  items: Map<Feeder, FeederAndDemandItem>;
  totalOperatingHours: number;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.items = new Map();
    this.totalOperatingHours = billingPeriod.getTotalDays() * 24;
    console.log("FeederAndDemand Created");
  }

  addMonthlyInterruptionData(data: MonthlyInterruptionItem) {
    this.addIfNotExist(data.feeder);
    this.items.get(data.feeder)?.setMonthlyInterruptionData(data);
  }

  addPowerSubstationData(data: PowerSubstationItem) {
    this.addIfNotExist(data.feeder);
    this.items.get(data.feeder)?.setPowerSubstationData(data);
  }

  private addIfNotExist(feeder: Feeder) {
    if (!this.items.has(feeder)) {
      this.items.set(
        feeder,
        new FeederAndDemandItem(feeder, this.totalOperatingHours)
      );
    }
  }
}

export default FeederAndDemand;
