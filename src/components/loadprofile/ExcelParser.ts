import XLSX from "xlsx";
import { LoadProfileStorage } from ".";
import { LoadProfileSettings } from "./types/LoadProfileSettings";
import { LoadProfile_Raw } from "./objects";
import { CellObject, WorkBook, WorkSheet } from "xlsx/types";
import MeteringPoint from "../../objects/common/enums/MeteringPoints";
import ExcelUtil from "../../objects/common/utils/ExcelUtil";

type LoadProfileRowData = {
  kwdelCell: CellObject;
  kwhdelCell: CellObject;
  dateCell: CellObject;
  timeCell: CellObject;
  row: number;
  sheetName: string;
};

function extractLoadProfileRawFromWorkbook(
  fileName: string,
  workbook: WorkBook,
  handleProgressUpdate: (progressInfo: string, progress: number) => void
) {
  return new Promise<{
    value: LoadProfile_Raw[];
    errors: string[];
    meteringPoints: string[];
  }>(async (resolve, reject) => {
    if (workbook === null) {
      reject(new Error("Invalid file"));
      return;
    }
    console.log("Parsing workbook...");

    let lp_rawDatas: LoadProfile_Raw[] = [];
    let errors: string[] = [];
    let meteringPoints: string[] = [];

    for (let sheetName of workbook.SheetNames) {
      if (!MeteringPoint.exists(sheetName)) {
        errors.push(
          `Invalid sheetname: ${sheetName}, expected: MF3MPITZAMC01~7`
        );
        continue;
      }
      meteringPoints.push(sheetName);

      handleProgressUpdate(`Parsing ${sheetName}`, 0);
      console.log("Parsing worksheet: " + sheetName);

      const worksheet = workbook.Sheets[sheetName];
      if (!worksheet["!ref"]) continue;
      const range = XLSX.utils.decode_range(worksheet["!ref"] as string);
      const totalRows = await Promise.resolve(range.e.r - range.s.r);
      for (let row = 0; row <= range.e.r; row++) {
        const percent = await calculatePercent(row, totalRows);
        handleProgressUpdate(
          `Processing rows ${row}/${totalRows} ${percent.toFixed(0)}%`,
          percent
        );
        try {
          let settings = LoadProfileStorage.loadSettings();
          let cells = extractCells(worksheet, row, sheetName, settings);
          let rawData = extractDataFromRow(cells, settings, fileName);
          lp_rawDatas.push(rawData);
        } catch (e) {
          errors.push(e.message);
        }
      }
    }
    console.log("finished");
    resolve({ value: lp_rawDatas, errors, meteringPoints });
  });
}

function calculatePercent(i: number, total: number): Promise<number> {
  return new Promise<number>((resolve, reject) => {
    setTimeout(() => {
      resolve((i / total) * 100);
    }, 0);
  });
}

//Extracts the load profile raw data from the row,
function extractCells(
  worksheet: WorkSheet,
  row: number,
  sheetName: string,
  settings: LoadProfileSettings
): LoadProfileRowData {
  //Builds the raw cell location {column, row}
  let kwdelAddress = { c: settings.kwdelCol, r: row };
  let dateAddress = { c: settings.dateCol, r: row };
  let timeAddress = { c: settings.timeCol, r: row };
  let kwhdelAddress = { c: settings.kwhdelCol, r: row };

  //Builds the encoded cell location {"A1", "B2"} to extract from worksheet
  let kwdelRef = XLSX.utils.encode_cell(kwdelAddress);
  let dateRef = XLSX.utils.encode_cell(dateAddress);
  let timeRef = XLSX.utils.encode_cell(timeAddress);
  let kwhdelRef = XLSX.utils.encode_cell(kwhdelAddress);

  return {
    kwdelCell: worksheet[kwdelRef],
    timeCell: worksheet[timeRef],
    dateCell: worksheet[dateRef],
    kwhdelCell: worksheet[kwhdelRef],
    sheetName: sheetName,
    row,
  };
}

function extractDataFromRow(
  rowData: LoadProfileRowData,
  settings: LoadProfileSettings,
  fileName: string
): LoadProfile_Raw {
  let error = null;
  let anyErrors = false;
  let rawData: LoadProfile_Raw | null = null;

  let kwdelCellData = ExcelUtil.extractNumber(rowData.kwdelCell);
  let kwhdelCellData = ExcelUtil.extractNumber(rowData.kwhdelCell);
  let dateCellData = ExcelUtil.extractDate(
    rowData.dateCell,
    settings.dateFormat
  );
  let timeCellData = ExcelUtil.extractDate(
    rowData.timeCell,
    settings.timeFormat
  );

  anyErrors = Boolean(
    kwdelCellData.error ||
      dateCellData.error ||
      timeCellData.error ||
      kwhdelCellData.error
  );
  if (anyErrors) {
    error = `Errors in row ${rowData.row + 1}:\n`;
    if (kwdelCellData.error)
      error = error.concat(`\tKwdel Cell: ${kwdelCellData.error}\n`);
    if (dateCellData.error)
      error = error.concat(`\tDate Cell: ${dateCellData.error}\n`);
    if (timeCellData.error)
      error = error.concat(`\tTime Cell: ${timeCellData.error}\n`);
    if (kwhdelCellData.error)
      error = error.concat(`\tKwhdel Cell: ${timeCellData.error}\n`);

    throw new Error(error);
  } else {
    let kwhdel = kwhdelCellData.number as number;
    let kwdel = kwdelCellData.number as number;
    let day = dateCellData.date?.getDate() as number;
    let month = dateCellData.date?.getMonth() as number;
    let hour = timeCellData.date?.getHours() as number;
    let minute = timeCellData.date?.getMinutes() as number;
    let year = dateCellData.date?.getFullYear() as number;
    rawData = new LoadProfile_Raw(
      kwdel,
      kwhdel,
      day,
      month + 1,
      year,
      hour,
      minute,
      rowData.sheetName,
      rowData.row,
      fileName
    );
  }

  // console.log(`row: ${rawData.row} ${rawData.hour}:${rawData.minute}`);
  return rawData;
}

export default extractLoadProfileRawFromWorkbook;
