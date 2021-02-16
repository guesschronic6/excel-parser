import { Feeder } from "../../common/object";
import { MonthlyInterruptionRawData } from "../../monthly_interruption/types";
import { PowerSubstationRawData } from "../../power_substation/types";

class FeederAndDemandItem {
  feeder: Feeder;
  feederInput: number;
  demand: number;
  minutes: { fileName: string; value: number }[];
  hours: number;
  operatingHours: number;
  powerFactor: number;
  loadFactor: number;
  kvarhrEnergy: number;
  totalOperatingHours: number;
  powerSubstaionFileName: string;
  totalMinutes: number;
  totalHours: number;

  constructor(feeder: Feeder, totalOperatingHours: number) {
    this.feeder = feeder;
    this.feederInput = 0;
    this.demand = 0;
    this.minutes = [];
    this.hours = 0;
    this.operatingHours = 0;
    this.powerFactor = 0;
    this.loadFactor = 0;
    this.kvarhrEnergy = 0;
    this.totalOperatingHours = totalOperatingHours;
    this.powerSubstaionFileName = "";
    this.totalMinutes = 0;
    this.totalHours = 0;
  }

  private getTotalMinutes() {
    let total = 0;
    for (let min of this.minutes) {
      total += min.value;
    }
    return total;
  }

  removeMonthlyInterruptionData(fileName: string) {
    this.minutes = this.minutes.filter(
      (minute) => minute.fileName !== fileName
    );
  }

  removePowerSubstationData(fileName: string) {
    if (this.powerSubstaionFileName === fileName) {
      this.powerSubstaionFileName = "";
      this.demand = 0;
      this.feederInput = 0;
      this.kvarhrEnergy = 0;
    }
  }

  addRawMonthlyInterruptionData(rawData: MonthlyInterruptionRawData) {
    this.minutes.push({ fileName: rawData.fileName, value: rawData.duration });
  }

  setPowerSubstationData(data: PowerSubstationRawData) {
    this.demand = data.demandKwhr;
    this.feederInput = data.kwhrEnergy;
    this.kvarhrEnergy = data.kvarhrEnergy;
    this.powerSubstaionFileName = data.fileName;
  }

  recalculateData() {
    this.totalMinutes = this.getTotalMinutes();
    this.totalHours = this.totalMinutes / 60;
    this.operatingHours = this.totalOperatingHours - this.totalHours;
    this.powerFactor = this.getPowerFactor();
    this.loadFactor = this.getLoadFactor();
  }

  private getPowerFactor() {
    let pf = Math.cos(Math.atan(this.kvarhrEnergy / this.feederInput)) * 100;
    return pf ? pf : 0;
  }

  private getLoadFactor() {
    let lf = this.feederInput / this.operatingHours / this.demand;
    return lf ? lf : 0;
  }
}

export default FeederAndDemandItem;
