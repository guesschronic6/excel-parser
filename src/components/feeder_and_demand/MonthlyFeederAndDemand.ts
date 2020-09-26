import BillingPeriod from "../../objects/common/BillingPeriod";
import { MonthlyInterruptionRawData } from "../../objects/monthly_interruption/types";
import { PowerSubstationRawData } from "../../objects/power_substation/types";
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

  addRawMonthlyInterruptionData(rawData: MonthlyInterruptionRawData) {
    this.addIfNotExist(rawData.billingPeriod);
    this.feederAndDemands
      .get(rawData.billingPeriod.toString())
      ?.addMonthlyInterruptionData(rawData);
  }

  addRawPowerSubstationData(rawData: PowerSubstationRawData) {
    this.addIfNotExist(rawData.billingPeriod);
    this.feederAndDemands
      .get(rawData.billingPeriod.toString())
      ?.addRawPowerSubstationData(rawData);
  }

  removePowerSubstationDataByFilename(fileName: string) {
    this.feederAndDemands.forEach((feederAndDemand) =>
      feederAndDemand.removePowerSubstationByFileName(fileName)
    );
  }
  removeMonthlyInterruptionDataByFilename(fileName: string) {
    this.feederAndDemands.forEach((feederAndDemand) =>
      feederAndDemand.removeMonthlyInterruptionByFileName(fileName)
    );
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
