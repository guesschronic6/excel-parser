import { CellObject } from "xlsx/types";
import { BillingPeriod, Feeder } from "../common/object";

export type MonthlyInterruptionSettings = {
  dateCol: number;
  durationCol: number;
  feederCol: number;
  dateFormat: string;
};

export type MonthlyInterruptionRawData = {
  feeder: Feeder;
  date: Date;
  billingPeriod: BillingPeriod;
  duration: number;
  fileName: string;
};

export type MonthlyInterruptionCells = {
  feeder: CellObject;
  date: CellObject;
  duration: CellObject;
  row: number;
};
