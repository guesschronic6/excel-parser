import { CellObject } from "xlsx/types";
import BillingPeriod from "../../common/BillingPeriod";

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
  feeder: string;
  billingPeriod: BillingPeriod;
};

export type PowerSubstationObject = {
  demandKwhr: number;
  kvarhrEnergy: number;
  kwhrEnergy: number;
  feeder: string;
};
