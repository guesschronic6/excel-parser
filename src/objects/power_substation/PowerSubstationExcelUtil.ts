import { WorkBook, WorkSheet } from "xlsx/types";
import ExcelUtil from "../common/utils/ExcelUtil";
import PowerSubstationUtil from "./PowerSubstationUtil";
import {
  PowerSubstationCells,
  PowerSubstationRawData,
  PowerSubstationSettings,
} from "./types";
import PowerSubstation from "./PowerSubstation";

import { findFeeder } from "../common/GeneralUtil";
import XLSX from "xlsx";
import BillingPeriod from "../common/BillingPeriod";

function extractRawDatasFromWorkbook(
  filename: string,
  workbook: WorkBook,
  billingPeriod: BillingPeriod,
  progressCallback: (info: string, progress: number) => void
): Promise<{ value: PowerSubstationRawData[]; errors: string[] }> {
  return new Promise(async (resolve, reject) => {
    let errors: string[] = [];
    let value: PowerSubstationRawData[] = [];

    console.log("MonthllyInterruption Workbook: ");
    console.log(workbook);

    for (let sheetName of workbook.SheetNames) {
      let worksheet = workbook.Sheets[sheetName];
      progressCallback(`Parsing ${sheetName}`, 0);
      console.log("Parsing worksheet: " + sheetName);

      if (!worksheet["!ref"]) continue;
      const range = XLSX.utils.decode_range(worksheet["!ref"] as string);
      const totalRows = await Promise.resolve(range.e.r - range.s.r);

      for (let row = 0; row <= range.e.r; row++) {
        const percent = await ExcelUtil.calculatePercent(row, totalRows);
        progressCallback(
          `Processing rows ${row}/${totalRows} ${percent.toFixed(0)}%`,
          percent
        );
        try {
          let settings = PowerSubstationUtil.loadSettings();
          let cells = extractCells(worksheet, row, settings);
          let rawData = extractDataFromCells(cells, billingPeriod);
          value.push(rawData);
        } catch (e) {
          errors.push(e.message);
        }
      }
    }
    resolve({ value, errors });
  });
}

function extractDataFromCells(
  rowCells: PowerSubstationCells,
  bililngPeriod: BillingPeriod
): PowerSubstationRawData {
  let error = null;
  let anyErrors = false;
  let rawData: PowerSubstationRawData | null = null;

  let feederCellData = ExcelUtil.extractText(rowCells.feeder);
  let kwhrEnergyCellData = ExcelUtil.extractNumber(rowCells.kwhrEnergy, false);
  let demandKwhrCellData = ExcelUtil.extractNumber(rowCells.demandKwhr, false);
  let kvarhrEnergyCelLData = ExcelUtil.extractNumber(
    rowCells.kvarhrEnergy,
    false
  );

  if (feederCellData.text) {
    let feeder = findFeeder(feederCellData.text);
    if (!feeder) {
      feederCellData.error = `Feeder value ${feederCellData.text} does not match any of the registered feeders`;
    }
  }

  anyErrors = Boolean(
    kwhrEnergyCellData.error ||
      demandKwhrCellData.error ||
      kvarhrEnergyCelLData.error ||
      feederCellData.error
  );
  if (anyErrors) {
    error = `Errors in row ${rowCells.row + 1}:\n`;
    if (kwhrEnergyCellData.error)
      error = error.concat(`\tKwhrEnergy Cell: ${kwhrEnergyCellData.error}\n`);
    if (demandKwhrCellData.error)
      error = error.concat(
        `\tDemand KwhrEnergy Cell: ${demandKwhrCellData.error}\n`
      );
    if (kvarhrEnergyCelLData.error)
      error = error.concat(
        `\tKvarhrEnergy Cell: ${kvarhrEnergyCelLData.error}\n`
      );
    if (feederCellData.error)
      error = error.concat(`\tFeeder Cell: ${feederCellData.error}\n`);

    throw new Error(error);
  } else {
    let kwhrEnergy = kwhrEnergyCellData.number as number;
    let kvarhrEnergy = kvarhrEnergyCelLData.number as number;
    let demandKwhr = demandKwhrCellData.number as number;
    let feeder = feederCellData.text as string;
    rawData = PowerSubstationUtil.createRawData(
      feeder,
      kwhrEnergy,
      kvarhrEnergy,
      demandKwhr,
      bililngPeriod
    );
  }

  // console.log(`row: ${rawData.row} ${rawData.hour}:${rawData.minute}`);
  return rawData;
}

function extractCells(
  worksheet: WorkSheet,
  row: number,
  settings: PowerSubstationSettings
): PowerSubstationCells {
  //Builds the raw cell location {column, row}
  let kwhrEnergyAddress = { c: settings.kwhrEnergyCol, r: row };
  let demandKwhrAddress = { c: settings.demandKwhrCol, r: row };
  let kvarhrEnergyAddress = { c: settings.kvarhrEnergyCol, r: row };
  let feederAddress = { c: settings.feederCol, r: row };

  //Builds the encoded cell location {"A1", "B2"} to extract from worksheet
  let feederRef = XLSX.utils.encode_cell(feederAddress);
  let kwhrEnergyRef = XLSX.utils.encode_cell(kwhrEnergyAddress);
  let kvarhrEnergyRef = XLSX.utils.encode_cell(kvarhrEnergyAddress);
  let demandKwhrRef = XLSX.utils.encode_cell(demandKwhrAddress);

  return {
    feeder: worksheet[feederRef],
    kwhrEnergy: worksheet[kwhrEnergyRef],
    demandKwhr: worksheet[demandKwhrRef],
    kvarhrEnergy: worksheet[kvarhrEnergyRef],
    row,
  };
}

const PowerSubstationExcelUtil = Object.freeze({
  extractRawDatasFromWorkbook,
});

export default PowerSubstationExcelUtil;
