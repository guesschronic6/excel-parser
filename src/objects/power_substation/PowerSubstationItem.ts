import Feeder from "../common/enums/Feeder";
import { PowerSubstationRawData } from "./types";

class PowerSubstationItem {
  demandKwhr: number;
  kvarhrEnergy: number;
  kwhrEnergy: number;
  feeder: Feeder;
  fileName: string;

  constructor(rawData: PowerSubstationRawData) {
    this.demandKwhr = rawData.demandKwhr;
    this.kvarhrEnergy = rawData.kvarhrEnergy;
    this.kwhrEnergy = rawData.kwhrEnergy;
    this.feeder = rawData.feeder;
    this.fileName = rawData.fileName;
  }
}

export default PowerSubstationItem;
