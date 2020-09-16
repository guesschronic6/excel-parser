import { CellObject, WorkSheet } from "xlsx/types";
import { FileUtil } from "../utils";
import XLSX from "xlsx";
import { LoadProfileSettings } from "../StorageManager";
import { isValidElement } from "react";
import moment from "moment";

type LoadProfileRawData = {
  kwdelCell: CellObject;
  dateCell: CellObject;
  timeCell: CellObject;
  row: number;
};

class LoadProfileExcelParser {
  worksheets: WorkSheet[];
  file: File;
  settings: LoadProfileSettings;
  errors: string[];

  constructor(file: File) {
    this.worksheets = [];
    this.file = file;
    this.settings = new LoadProfileSettings();
    this.errors = [];
  }
  //progresssCallback() params message~to progress report messagem, progress: the progress value (percent)
  async extractMonthlyLoadProfileFromFile(
    progressCallback: (message: string, progress: number) => void
  ) {
    try {
      let workbook = await FileUtil.extractWorkbookFromFile(this.file); //extracts the workbook from the file
      this.settings = new LoadProfileSettings(); //To reload the settings from the local storage
      this.errors = [];
      workbook.SheetNames.forEach((sheetName) => {
        let worksheet = workbook.Sheets[sheetName];
        let range = XLSX.utils.decode_range(worksheet["!ref"] as string);

        for (let row = 0; row <= range.e.r; row++) {
          try {
            let rawData = this.extractCellValues(worksheet, row);
            rawData = this.validateRawData(rawData);
          } catch (e) {
            this.errors.push(e.message);
          }
        }

        console.log({
          function: "workbook.SheetNames.forEach()",
          params: { sheetName },
          info: { worksheet, range },
        });
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  //Extracts the load profile raw data from the row,
  private extractCellValues(
    worksheet: WorkSheet,
    row: number
  ): LoadProfileRawData {
    //Builds the raw cell location {column, row}
    let kwdelAddress = { c: this.settings.kwdelCol, r: row };
    let dateAddress = { c: this.settings.dateCol, r: row };
    let timeAddress = { c: this.settings.timeCol, r: row };

    //Builds the encoded cell location {"A1", "B2"} to extract from worksheet
    let kwdelRef = XLSX.utils.encode_cell(kwdelAddress);
    let dateRef = XLSX.utils.encode_cell(dateAddress);
    let timeRef = XLSX.utils.encode_cell(timeAddress);

    return {
      kwdelCell: worksheet[kwdelRef],
      timeCell: worksheet[timeRef],
      dateCell: worksheet[dateRef],
      row,
    };
  }

  private validateRawData(rawData: LoadProfileRawData): LoadProfileRawData {
    let errors = `Errors in row ${rawData.row + 1}: `;
    let anyErrors = false;
    let kwdelError = this.isKwdelCellValid(rawData.kwdelCell);
    let dateError = this.isDateCellValid(rawData.dateCell);

    return rawData;
  }

  private isKwdelCellValid(
    kwdelCell: CellObject
  ): { error: string | null; value: number | null } {
    let error = null;
    let value = null;
    if (!(kwdelCell.t === "n" || Number(kwdelCell.r))) {
      error = `KwdelCell expectations: number received: ${kwdelCell.r}`;
    } else {
      value = Number(kwdelCell.r);
    }
    return { error, value };
  }

  private isDateCellValid(
    dateCell: CellObject
  ): { error: string | null; value: Date | null } {
    let error: string | null = null;
    let value = null;
    let x: any = null;
    if (dateCell.t !== "d") {
      if (dateCell.t === "s") {
        x = moment(dateCell.r, this.settings.dateFormat);
      } else {
        error = `DateCell expectations: date received: ${dateCell.r}`;
      }
    } else {
      value = dateCell.r;
    }
    console.log({
      method: "isDateCellValid()",
      params: { dateCell },
      values: {
        error,
        value,
        x,
        dateFormat: this.settings.dateFormat,
        date: dateCell.r,
      },
    });

    return { error, value };
  }
}

export default LoadProfileExcelParser;
