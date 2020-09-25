import { CellObject } from "xlsx/types";
import BillingPeriod from "../../common/BillingPeriod";
import Feeder from "../../common/enums/Feeder";

export type PowerSubstationSettings = {
  demandKwhrCol: number;
  kvarhrEnergyCol: number;
  kwhrEnergyCol: number;
  feederCol: number;
};

export type PowerSubstationCells = {
  demandKwhr: CellObject;
  kvarhrEnergy: CellObject;
  kwhrEnergy: CellObject;
  feeder: CellObject;
  row: number;
};

export type PowerSubstationRawData = {
  demandKwhr: number;
  kvarhrEnergy: number;
  kwhrEnergy: number;
  feeder: Feeder;
  billingPeriod: BillingPeriod;
  fileName: string;
};
