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
  }

  addRawData(rawData: PowerSubstationRawData) {
    let key = rawData.billingPeriod.toString();
    if (!this.powerSubstations.has(key)) {
      this.powerSubstations.set(
        key,
        new PowerSubstation(rawData.billingPeriod)
      );
    }
    this.powerSubstations.get(key)?.addRawData(rawData);
  }
}

export default MonthlyPowerSubstation;
