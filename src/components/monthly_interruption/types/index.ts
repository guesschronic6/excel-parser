import { CellObject } from "xlsx/types";
import BillingPeriod from "../../../objects/common/BillingPeriod";

export type MonthlyInterruptionSettings = {
  dateCol: number;
  durationCol: number;
  feederCol: number;
  dateFormat: string;
};

export type MonthlyInterruptionRawData = {
  feeder: string;
  date: Date;
  billingPeriod: BillingPeriod;
  duration: number;
};

export type MonthlyInterruptionCells = {
  feeder: CellObject;
  date: CellObject;
  duration: CellObject;
  row: number;
};
