import { WorkBook, WorkSheet } from "xlsx/types";
import ExcelUtil from "../common/utils/ExcelUtil";
import { loadSettings } from "./MonthlyInterruptionSettings";
import {
  MonthlyInterruptionRawData,
  MonthlyInterruptionCells,
  MonthlyInterruptionSettings,
} from "./types";

import { findFeeder } from "../common/GeneralUtil";
import XLSX from "xlsx";
import MonthlyInterruption from "./MonthlyInterruption";

function extractRawDatasFromWorkbook(
  filename: string,
  workbook: WorkBook,
  progressCallback: (info: string, progress: number) => void
): Promise<{ value: MonthlyInterruptionRawData[]; errors: string[] }> {
  return new Promise(async (resolve, reject) => {
    let errors: string[] = [];
    let value: MonthlyInterruptionRawData[] = [];

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
          let settings = loadSettings();
          let cells = extractCells(worksheet, row, settings);
          let rawData = extractDataFromCells(cells, settings);
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
  rowCells: MonthlyInterruptionCells,
  settings: MonthlyInterruptionSettings
): MonthlyInterruptionRawData {
  let error = null;
  let anyErrors = false;
  let rawData: MonthlyInterruptionRawData | null = null;

  let dateCellData = ExcelUtil.extractDate(rowCells.date, settings.dateFormat);
  let feederCellData = ExcelUtil.extractText(rowCells.feeder);
  let durationCellData = ExcelUtil.extractNumber(rowCells.duration);

  if (feederCellData.text) {
    let feeder = findFeeder(feederCellData.text);
    if (!feeder) {
      feederCellData.error = `Feeder value ${feederCellData.text} does not match any of the registered feeders`;
    }
  }

  anyErrors = Boolean(
    dateCellData.error || durationCellData.error || feederCellData.error
  );
  if (anyErrors) {
    error = `Errors in row ${rowCells.row + 1}:\n`;
    if (durationCellData.error)
      error = error.concat(`\tDuration Cell: ${durationCellData.error}\n`);
    if (dateCellData.error)
      error = error.concat(`\tDate Cell: ${dateCellData.error}\n`);
    if (feederCellData.error)
      error = error.concat(`\tFeeder Cell: ${feederCellData.error}\n`);

    throw new Error(error);
  } else {
    let duration = durationCellData.number as number;
    let date = dateCellData.date as Date;
    let feeder = feederCellData.text as string;
    rawData = MonthlyInterruption.createRawDataObject(duration, feeder, date);
  }

  // console.log(`row: ${rawData.row} ${rawData.hour}:${rawData.minute}`);
  return rawData;
}

function extractCells(
  worksheet: WorkSheet,
  row: number,
  settings: MonthlyInterruptionSettings
): MonthlyInterruptionCells {
  //Builds the raw cell location {column, row}
  let dateAddress = { c: settings.dateCol, r: row };
  let feederAddress = { c: settings.feederCol, r: row };
  let durationAddress = { c: settings.durationCol, r: row };

  //Builds the encoded cell location {"A1", "B2"} to extract from worksheet
  let dateRef = XLSX.utils.encode_cell(dateAddress);
  let feederRef = XLSX.utils.encode_cell(feederAddress);
  let durationRef = XLSX.utils.encode_cell(durationAddress);

  return {
    feeder: worksheet[feederRef],
    date: worksheet[dateRef],
    duration: worksheet[durationRef],
    row,
  };
}

export { extractRawDatasFromWorkbook };
