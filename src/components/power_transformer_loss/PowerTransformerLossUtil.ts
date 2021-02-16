import {
  PowerTransformerLoss,
  PowerTransformerLossItem,
  MonthlyPowerTransformerLoss,
} from "./objects";
import { PowerSubstationRawData } from "../power_substation/types";
import XLSX from "xlsx";
import { GeneralUtil, BillingPeriod } from "../common/object";

const PowerTransformerLossUtil = Object.freeze({
  generateExcelFile,
  addPowerSubstatoinRawDatas,
  addPowerSubstatoinRawDatasAsync,
  removePowerSubstationFileAsync,
  removePowerSubstationFile,
  replacePowerTransformerLossItem,
  replacePowerTransformerLossItemAsync,
});

async function addPowerSubstatoinRawDatasAsync(
  rawDatas: PowerSubstationRawData[],
  monthlyPowerTransformerLoss: MonthlyPowerTransformerLoss
) {
  return addPowerSubstatoinRawDatas(rawDatas, monthlyPowerTransformerLoss);
}

function addPowerSubstatoinRawDatas(
  rawDatas: PowerSubstationRawData[],
  monthlyPowerTransformerLoss: MonthlyPowerTransformerLoss
) {
  rawDatas.forEach((rawData) => {
    let substation = GeneralUtil.findSubstationOfFeeder(rawData.feeder);
    if (substation) {
      let substationItem = GeneralUtil.findSubstationItemOfFeeder(
        rawData.feeder,
        substation
      );
      if (substationItem) {
        monthlyPowerTransformerLoss
          .addIfNotExistOrElseGet(rawData.billingPeriod, rawData.fileName)
          .addIfNotExistsOrElseGet(substation)
          .addIfNotExistsOrElseGet(substationItem)
          .addPowerSubstatoinData(rawData);
      }
    }
  });
  return monthlyPowerTransformerLoss;
}
async function removePowerSubstationFileAsync(
  fileName: string,
  monthlyPowerTransformerLoss: MonthlyPowerTransformerLoss
) {
  return removePowerSubstationFile(fileName, monthlyPowerTransformerLoss);
}

function removePowerSubstationFile(
  fileName: string,
  monthlyPowerTransformerLoss: MonthlyPowerTransformerLoss
) {
  [...monthlyPowerTransformerLoss.powerTransformerLosses.keys()].forEach(
    (key) => {
      if (
        monthlyPowerTransformerLoss.powerTransformerLosses.get(key)
          ?.fileName === fileName
      ) {
        monthlyPowerTransformerLoss.powerTransformerLosses.delete(key);
      }
    }
  );

  return monthlyPowerTransformerLoss;
}

async function replacePowerTransformerLossItemAsync(
  item: PowerTransformerLossItem,
  billingPeriod: BillingPeriod,
  monthlyPowerTransformerLoss: MonthlyPowerTransformerLoss
) {
  return replacePowerTransformerLossItem(
    item,
    billingPeriod,
    monthlyPowerTransformerLoss
  );
}

function replacePowerTransformerLossItem(
  item: PowerTransformerLossItem,
  billingPeriod: BillingPeriod,
  monthlyPowerTransformerLoss: MonthlyPowerTransformerLoss
) {
  monthlyPowerTransformerLoss.powerTransformerLosses
    .get(billingPeriod.toString())
    ?.items.get(item.substationItem.substationKey)
    ?.replacePowerTransformerLossItem(item);

  return monthlyPowerTransformerLoss;
}

function generateExcelFile(powerTransformerLoss: PowerTransformerLoss) {
  let workbook = XLSX.utils.book_new();
  let worksheetName = `${powerTransformerLoss.billingPeriod.toString()}`;
  let worksheetData = generateSheetData(powerTransformerLoss);
  let worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(
    workbook,
    `Monthly Power Transformer Loss Report of ${powerTransformerLoss.billingPeriod.toString()}.xlsx`
  );
}

function generateSheetData(powerTransformerLoss: PowerTransformerLoss) {
  let data = [];

  //---------CREATING HEADERS-------------

  let header = [
    "Substation",
    "Power Transformer",
    "Brand",
    "Energy (MWHR)",
    "Demand (MW)",
    "Power Factor",
    "Load (MVA)",
    "Percent Loading",
    "Operation Hours",
    "Ave. Load (MW)",
    "Load Factor",
    "Loss Factor",
    "Core Loss",
    "Winding Loss",
    "Auxiliary Loss",
    "Total Losses",
  ];

  data.push(header);

  //----------CONTENT----------------
  for (let substation of powerTransformerLoss.items.values()) {
    for (let item of substation.substationItems.values()) {
      data.push([
        substation.substation.text,
        `${item.substationItem.transformer.power} mVA`,
        item.substationItem.transformer.brand,
        item.energMwhr.toFixed(2),
        item.demandMW.toFixed(2),
        item.powerFactor.toFixed(2),
        item.loadMVA.toFixed(2),
        item.percentLoading.toFixed(2),
        item.operationHours.toFixed(2),
        item.averageLoad.toFixed(2),
        item.loadFactor.toFixed(2),
        item.coreLoss.toFixed(2),
        item.windingLoss.toFixed(2),
        item.auxiliaryLoss.toFixed(2),
        item.totalLosses.toFixed(2),
      ]);
    }
  }
  console.log(data);
  return data;
}
export default PowerTransformerLossUtil;
