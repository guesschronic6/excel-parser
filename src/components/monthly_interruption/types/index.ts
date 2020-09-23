import { CellObject } from "xlsx/types";
import BillingPeriod from "../../common/BillingPeriod";
import Feeder from "../../../objects/common/enums/Feeder";

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
