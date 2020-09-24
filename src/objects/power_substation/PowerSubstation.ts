import { Month } from "../../components/enums";
import BillingPeriod from "../common/BillingPeriod";
import { saveSettings, loadSettings } from "./PowerSubstationSettings";
import { PowerSubstationObject, PowerSubstationRawData } from "./types";
import { extractRawDatasFromWorkbook } from "./PowerSubstationExcelUtil";

const PowerSubstation = Object.freeze({
  saveSettings,
  loadSettings,
  createRawData,
  extractRawDatasFromWorkbook,
  createObject,
});

function createObject(rawData: PowerSubstationRawData): PowerSubstationObject {
  return {
    feeder: rawData.feeder,
    kwhrEnergy: rawData.kwhrEnergy,
    kvarhrEnergy: rawData.kvarhrEnergy,
    demandKwhr: rawData.demandKwhr,
  };
}

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
