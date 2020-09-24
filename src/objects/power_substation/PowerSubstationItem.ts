import { PowerSubstationRawData } from "./types";

class PowerSubstationItem {
  demandKwhr: number;
  kvarhrEnergy: number;
  kwhrEnergy: number;
  feeder: string;

  constructor(rawData: PowerSubstationRawData) {
    this.demandKwhr = rawData.demandKwhr;
    this.kvarhrEnergy = rawData.kvarhrEnergy;
    this.kwhrEnergy = rawData.kwhrEnergy;
    this.feeder = rawData.feeder;
  }
}

export default PowerSubstationItem;
