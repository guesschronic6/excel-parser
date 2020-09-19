import XLSX, { Range } from "xlsx";
import { LoadProfileStorage } from ".";
import { LoadProfileSettings } from "./types/LoadProfileSettings";
import { LoadProfile_Raw } from "./objects";
import moment from "moment";
import { CellObject, WorkBook, WorkSheet } from "xlsx/types";
import MeteringPoint from "./enums/MeteringPoints";

type LoadProfileRowData = {
  kwdelCell: CellObject;
  dateCell: CellObject;
  timeCell: CellObject;
  row: number;
  sheetName: string;
};

function extractLoadProfileRawFromWorkbook(
  workbook: WorkBook,
  handleProgressUpdate: (progressInfo: string, progress: number) => void
) {
  return new Promise<{ value: LoadProfile_Raw[]; errors: string[] }>(
    async (resolve, reject) => {
      if (workbook === null) {
        reject(new Error("Invalid file"));
        return;
      }
      console.log("Parsing workbook...");

      let lp_rawDatas: LoadProfile_Raw[] = [];
      let errors: string[] = [];

      for (let sheetName of workbook.SheetNames) {
        if (!MeteringPoint.exists(sheetName)) {
          errors.push(
            `Invalid sheetname: ${sheetName}, expected: MF3MPITZAMC01~7`
          );
          continue;
        }

        handleProgressUpdate(`Parsing ${sheetName}`, 0);
        console.log("Parsing worksheet: " + sheetName);

        const worksheet = workbook.Sheets[sheetName];
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
            let rawData = extractDataFromRow(cells, settings);

            lp_rawDatas.push(rawData);
          } catch (e) {
            errors.push(e.message);
          }
        }
      }
      console.log("finished");
      handleProgressUpdate("Finished processing", 100);
      resolve({ value: lp_rawDatas, errors });
    }
  );
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

  //Builds the encoded cell location {"A1", "B2"} to extract from worksheet
  let kwdelRef = XLSX.utils.encode_cell(kwdelAddress);
  let dateRef = XLSX.utils.encode_cell(dateAddress);
  let timeRef = XLSX.utils.encode_cell(timeAddress);

  return {
    kwdelCell: worksheet[kwdelRef],
    timeCell: worksheet[timeRef],
    dateCell: worksheet[dateRef],
    row,
    sheetName: sheetName,
  };
}

function extractDataFromRow(
  rowData: LoadProfileRowData,
  settings: LoadProfileSettings
): LoadProfile_Raw {
  let error = null;
  let anyErrors = false;
  let rawData: LoadProfile_Raw | null = null;

  let kwdelCellData = extractKwdelCellData(rowData.kwdelCell);
  let dateCellData = extractDateCellData(rowData.dateCell, settings.dateFormat);
  let timeCellData = extractTimeCellData(rowData.timeCell, settings.timeFormat);

  anyErrors = Boolean(
    kwdelCellData.error || dateCellData.error || timeCellData.error
  );
  if (anyErrors) {
    error = `Errors in row ${rowData.row + 1}:\n`;
    if (kwdelCellData.error) error = error.concat(`\t${kwdelCellData.error}\n`);
    if (dateCellData.error) error = error.concat(`\t${dateCellData.error}\n`);
    if (timeCellData.error) error = error.concat(`\t${timeCellData.error}\n`);

    throw new Error(error);
  } else {
    let kwdel = kwdelCellData.value as number;
    let day = dateCellData.value?.getDate() as number;
    let month = dateCellData.value?.getMonth() as number;
    let hour = timeCellData.value?.getHours() as number;
    let minute = timeCellData.value?.getMinutes() as number;
    let year = dateCellData.value?.getFullYear() as number;
    rawData = new LoadProfile_Raw(
      kwdel,
      day,
      month + 1,
      year,
      hour,
      minute,
      rowData.sheetName,
      rowData.row
    );
  }

  // console.log(`row: ${rawData.row} ${rawData.hour}:${rawData.minute}`);
  return rawData;
}

function extractKwdelCellData(
  kwdelCell: CellObject
): { error: string | null; value: number | null } {
  let error = null;
  let value = null;
  if (!(kwdelCell.t === "n" || Number(kwdelCell.v || kwdelCell.w))) {
    error = `KwdelCell expectations: number received: ${kwdelCell.v}`;
  } else {
    value = Number(kwdelCell.v || kwdelCell.r);
  }
  return { error, value };
}

function extractDateCellData(
  dateCell: CellObject,
  dateFormat: string
): { error: string | null; value: Date | null } {
  let error: string | null = null;
  let value = null;
  let x: any = null;
  // console.log({
  //   dateCell_t: dateCell.t,
  //   dateCell_w: dateCell.w,
  //   dateCell_r: dateCell.r,
  // });

  if (dateCell.t !== "d") {
    if (dateCell.t === "s") {
      x = moment(dateCell.v || dateCell.w || dateCell.r, dateFormat, true);
      if (!x.isValid()) {
        error = `DateCell expectations: date received: ${dateCell.v}`;
      } else {
        value = x.toDate();
      }
    } else {
      error = `DateCell expectations: date received: ${dateCell.v}`;
    }
  } else {
    value = dateCell.v as Date;
  }

  return { error, value };
}

function extractTimeCellData(
  timeCell: CellObject,
  timeFormat: string
): { error: string | null; value: Date | null } {
  let error: string | null = null;
  let value = null;
  let x: any = null;
  if (timeCell.t !== "d") {
    if (timeCell.t === "s") {
      x = moment(timeCell.v || timeCell.w || timeCell.r, timeFormat);
      if (!x.isValid()) {
        error = `TimeCell expectations: date received: ${timeCell.v}`;
      } else {
        value = x.toDate();
      }
    } else {
      error = `TimeCell expectations: date received: ${timeCell.v}`;
    }
  } else {
    value = timeCell.v as Date;
  }

  return { error, value };
}

export default extractLoadProfileRawFromWorkbook;
