import Feeder from "../common/enums/Feeder";
import MonthlyInterruptionItem from "../monthly_interruption/MonthlyInterruptionItem";
import PowerSubstationItem from "../power_substation/PowerSubstationItem";

class FeederAndDemandItem {
  feeder: Feeder;
  feederInput: number;
  demand: number;
  minutes: number;
  hours: number;
  operatingHours: number;
  powerFactor: number;
  loadFactor: number;
  kvarhrEnergy: number;
  totalOperatingHours: number;

  constructor(feeder: Feeder, totalOperatingHours: number) {
    this.feeder = feeder;
    this.feederInput = 0;
    this.demand = 0;
    this.minutes = 0;
    this.hours = 0;
    this.operatingHours = 0;
    this.powerFactor = 0;
    this.loadFactor = 0;
    this.kvarhrEnergy = 0;
    this.totalOperatingHours = totalOperatingHours;
  }

  setMonthlyInterruptionData(data: MonthlyInterruptionItem) {
    this.minutes = data.getTotalDuration();
    this.hours = this.minutes / 60;
  }

  setPowerSubstationData(data: PowerSubstationItem) {
    this.demand = data.demandKwhr;
    this.feederInput = data.kwhrEnergy;
    this.kvarhrEnergy = data.kvarhrEnergy;
  }

  recalculateData() {
    this.operatingHours = this.totalOperatingHours - this.hours;
    this.powerFactor =
      Math.cos(Math.atan(this.kvarhrEnergy / this.feederInput)) * 100;
    this.loadFactor = this.feederInput / this.operatingHours / this.demand;
  }
}

export default FeederAndDemandItem;
