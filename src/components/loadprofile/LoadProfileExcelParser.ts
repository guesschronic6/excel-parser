import { CellObject, WorkSheet } from "xlsx/types";
import { FileUtil } from "../common/utils";
import XLSX from "xlsx";
import moment from "moment";
import { LoadProfileSettings } from "./types/LoadProfileSettings";
import LoadProfileStorage from "./LoadProfileStorage";
import { LoadProfile_Raw } from "./objects";
import { Month } from "../enums";

type LoadProfileCellData = {
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
    this.settings = LoadProfileStorage.loadSettings();
    this.errors = [];
  }
  //progresssCallback() params message~to progress report messagem, progress: the progress value (percent)
  async extractMonthlyLoadProfileFromFile() {
    try {
      let workbook = await FileUtil.extractWorkbookFromFile(this.file); //extracts the workbook from the file
      this.settings = LoadProfileStorage.loadSettings(); //To reload the settings from the local storage
      this.errors = [];
      workbook.SheetNames.forEach((sheetName) => {
        let worksheet = workbook.Sheets[sheetName];
        let range = XLSX.utils.decode_range(worksheet["!ref"] as string);
        for (let row = 0; row <= range.e.r; row++) {
          try {
            let cells = this.extractCells(worksheet, row);
            let rawData = this.extractRawDataFromCells(cells);
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

      return null;
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }

  //Extracts the load profile raw data from the row,
  private extractCells(worksheet: WorkSheet, row: number): LoadProfileCellData {
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

  private extractRawDataFromCells(cells: LoadProfileCellData): LoadProfile_Raw {
    let error = null;
    let anyErrors = false;
    let rawData: LoadProfile_Raw | null = null;

    let kwdelCellData = this.extractKwdelCellData(cells.kwdelCell);
    let dateCellData = this.extractDateCellData(cells.dateCell);
    let timeCellData = this.extractTimeCellData(cells.timeCell);

    anyErrors = Boolean(
      kwdelCellData.error || dateCellData.error || timeCellData.error
    );
    if (anyErrors) {
      error = `Errors in row ${cells.row + 1}: \n`;
      kwdelCellData.error && error.concat(`\t${kwdelCellData.error}`);
      dateCellData.error && error.concat(`\t${dateCellData.error}`);
      timeCellData.error && error.concat(`\t${timeCellData.error}`);
      throw new Error(error);
    } else {
      let kwdel = kwdelCellData.value as number;
      let day = dateCellData.value?.getDate() as number;
      let month = dateCellData.value?.getMonth() as number;
      let hour = timeCellData.value?.getHours() as number;
      let minute = timeCellData.value?.getMinutes() as number;
      let year = dateCellData.value?.getFullYear() as number;
      rawData = new LoadProfile_Raw(kwdel, day, month - 1, year, hour, minute);
    }

    console.log({
      rawData,
      error,
      month: Month[0],
    });

    return rawData;
  }

  private extractKwdelCellData(
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

  private extractDateCellData(
    dateCell: CellObject
  ): { error: string | null; value: Date | null } {
    let error: string | null = null;
    let value = null;
    let x: any = null;
    if (dateCell.t !== "d") {
      if (dateCell.t === "s") {
        x = moment(
          dateCell.v || dateCell.w || dateCell.r,
          this.settings.dateFormat
        );
      } else {
        error = `DateCell expectations: date received: ${dateCell.v}`;
      }
    } else {
      value = dateCell.v as Date;
    }

    return { error, value };
  }

  private extractTimeCellData(
    timeCell: CellObject
  ): { error: string | null; value: Date | null } {
    let error: string | null = null;
    let value = null;
    let x: any = null;
    if (timeCell.t !== "d") {
      if (timeCell.t === "s") {
        x = moment(
          timeCell.v || timeCell.w || timeCell.r,
          this.settings.timeFormat
        );
      } else {
        error = `TimeCell expectations: date received: ${timeCell.v}`;
      }
    } else {
      value = timeCell.v as Date;
    }

    return { error, value };
  }
}

export default LoadProfileExcelParser;
