import React, { useEffect, useState } from "react";
import { CellObject, WorkBook, WorkSheet } from "xlsx/types";
import { FileUtil } from "../common/utils";
import XLSX from "xlsx";
import { loadLoadProfileSettings } from "../common/StorageManager";
import { LoadProfileSettings } from "../common/LoadProfileSettings";
import { LoadProfile_Raw } from "../common/loadprofile/objects";
import moment from "moment";

type LoadProfileParserProps = {
  file: File;
  render: any;
};

type LoadProfileCellData = {
  kwdelCell: CellObject;
  dateCell: CellObject;
  timeCell: CellObject;
  row: number;
};

const LoadProfileParser: React.FunctionComponent<LoadProfileParserProps> = ({
  file,
  render,
  ...others
}) => {
  const [workbook, setWorkbook] = useState<WorkBook | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [settings, setSettings] = useState<LoadProfileSettings>(
    loadLoadProfileSettings()
  );

  useEffect(() => {
    const extractWorkbook = async () => {
      let wb = null;

      try {
        wb = await FileUtil.extractWorkbookFromFile(file);
      } catch (e) {
        console.log(e);
      }
      setWorkbook(wb);
    };
    extractWorkbook();
  }, [file]);

  useEffect(() => {
    if (workbook === null) return;
    setSettings(loadLoadProfileSettings());

    for (let sheetName of workbook.SheetNames) {
      let worksheet = workbook.Sheets[sheetName];
      let range = XLSX.utils.decode_range(worksheet["!ref"] as string);
      const totalRows = range.e.r - range.s.r;

      for (let row = 0; row <= range.e.r; row++) {
        const percent = (row / totalRows) * 100;
        setProgress(percent);
        setsProgressInfo(String(`processing row ${row}/${totalRows}`));
        console.log(`progress: ${progress} info: ${progressInfo}`);
        try {
          let cells = extractCells(worksheet, row);
          let rawData = extractRawDataFromCells(cells);
        } catch (e) {
          errors.push(e.message);
        } finally {
        }
      }
    }
    setProgress(100);
    setsProgressInfo(`Finished :D`);
  }, [workbook]);

  //Extracts the load profile raw data from the row,
  function extractCells(
    worksheet: WorkSheet,
    row: number
  ): LoadProfileCellData {
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
    };
  }

  function extractRawDataFromCells(
    cells: LoadProfileCellData
  ): LoadProfile_Raw {
    let error = null;
    let anyErrors = false;
    let rawData: LoadProfile_Raw | null = null;

    let kwdelCellData = extractKwdelCellData(cells.kwdelCell);
    let dateCellData = extractDateCellData(cells.dateCell);
    let timeCellData = extractTimeCellData(cells.timeCell);

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

    // console.log({
    //   rawData,
    //   error,
    // });

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
    dateCell: CellObject
  ): { error: string | null; value: Date | null } {
    let error: string | null = null;
    let value = null;
    let x: any = null;
    if (dateCell.t !== "d") {
      if (dateCell.t === "s") {
        x = moment(dateCell.v || dateCell.w || dateCell.r, settings.dateFormat);
      } else {
        error = `DateCell expectations: date received: ${dateCell.v}`;
      }
    } else {
      value = dateCell.v as Date;
    }

    return { error, value };
  }

  function extractTimeCellData(
    timeCell: CellObject
  ): { error: string | null; value: Date | null } {
    let error: string | null = null;
    let value = null;
    let x: any = null;
    if (timeCell.t !== "d") {
      if (timeCell.t === "s") {
        x = moment(timeCell.v || timeCell.w || timeCell.r, settings.timeFormat);
      } else {
        error = `TimeCell expectations: date received: ${timeCell.v}`;
      }
    } else {
      value = timeCell.v as Date;
    }

    return { error, value };
  }

  return (
    <React.Fragment>{render({ progress, progressInfo, file })}</React.Fragment>
  );
};

export default LoadProfileParser;
