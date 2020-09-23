import { Month } from "../../components/enums";
import BillingPeriod from "../common/BillingPeriod";
import { saveSettings, loadSettings } from "./PowerSubstationSettings";
import { PowerSubstationRawData } from "./types";
import { extractRawDatasFromWorkbook } from "./PowerSubstationExcelUtil";

const PowerSubstation = Object.freeze({
  saveSettings,
  loadSettings,
  createRawData,
  extractRawDatasFromWorkbook,
});

function createRawData(
  feeder: string,
  kwhrEnergy: number,
  kvarhrEnergy: number,
  demandKwhr: number,
  billingPeriod: BillingPeriod
): PowerSubstationRawData {
  return {
    kwhrEnergy,
    kvarhrEnergy,
    demandKwhr,
    billingPeriod,
    feeder,
  };
}

export default PowerSubstation;
