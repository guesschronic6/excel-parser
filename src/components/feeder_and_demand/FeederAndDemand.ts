import BillingPeriod from "../../objects/common/BillingPeriod";
import Feeder from "../../objects/common/enums/Feeder";
import { MonthlyInterruptionRawData } from "../../objects/monthly_interruption/types";
import { PowerSubstationRawData } from "../../objects/power_substation/types";
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

  addMonthlyInterruptionData(rawData: MonthlyInterruptionRawData) {
    this.addIfNotExist(rawData.feeder);
    this.items.get(rawData.feeder)?.addRawMonthlyInterruptionData(rawData);
  }

  addRawPowerSubstationData(data: PowerSubstationRawData) {
    this.addIfNotExist(data.feeder);
    this.items.get(data.feeder)?.setPowerSubstationData(data);
  }

  removeMonthlyInterruptionByFileName(fileName: string) {
    this.items.forEach((item) => {
      item.removeMonthlyInterruptionData(fileName);
    });
  }

  removePowerSubstationByFileName(fileName: string) {
    this.items.forEach((item) => {
      item.removePowerSubstationData(fileName);
    });
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
