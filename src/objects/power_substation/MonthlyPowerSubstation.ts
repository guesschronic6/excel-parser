import BillingPeriod from "../common/BillingPeriod";
import PowerSubstation from "./PowerSubstation";
import { PowerSubstationRawData } from "./types";

class MonthlyPowerSubstation {
  powerSubstations: Map<string, PowerSubstation>;

  constructor(monthlyPowerSubstation?: MonthlyPowerSubstation) {
    if (monthlyPowerSubstation) {
      this.powerSubstations = new Map(monthlyPowerSubstation.powerSubstations);
    } else {
      this.powerSubstations = new Map();
    }
    console.log("Monthly Power Substation Created...");
  }

  addRawData(rawData: PowerSubstationRawData) {
    this.addIfNotExist(rawData.billingPeriod);
    this.powerSubstations
      .get(rawData.billingPeriod.toString())
      ?.addRawData(rawData);
  }

  removeFile(fileName: string) {
    this.powerSubstations.forEach((ps) => {
      ps.removeFile(fileName);
    });
  }

  private addIfNotExist(billingPeriod: BillingPeriod) {
    let key = billingPeriod.toString();
    if (!this.powerSubstations.has(key)) {
      this.powerSubstations.set(key, new PowerSubstation(billingPeriod));
    }
  }
}

export default MonthlyPowerSubstation;
