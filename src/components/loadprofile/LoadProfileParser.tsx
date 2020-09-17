import React, { useEffect, useLayoutEffect, useState } from "react";
import { CellObject, WorkBook, WorkSheet } from "xlsx/types";
import { FileUtil } from "../common/utils";
import XLSX from "xlsx";
import { LoadProfileStorage } from ".";
import { LoadProfileSettings } from "./types/LoadProfileSettings";
import { LoadProfile_Raw } from "./objects";
import moment from "moment";

type LoadProfileParserProps = {
  file: File;
  render?: any;
  onFileParsed: (data: LoadProfile_Raw[]) => void;
};

type LoadProfileRowData = {
  kwdelCell: CellObject;
  dateCell: CellObject;
  timeCell: CellObject;
  row: number;
  sheetName: string;
};

const LoadProfileParser: React.FunctionComponent<LoadProfileParserProps> = ({
  file,
  render,
  onFileParsed,
  ...others
}) => {
  const [workbook, setWorkbook] = useState<WorkBook | null>(null);
  const [progress, setProgress] = useState<number>(0);
  const [progressInfo, setsProgressInfo] = useState<string>("");
  const [errors, setErrors] = useState<string[]>([]);
  const [settings, setSettings] = useState<LoadProfileSettings>(
    LoadProfileStorage.loadSettings()
  );

  useEffect(() => {
    const extractWorkbook = async () => {
      let wb = null;
      try {
        wb = await FileUtil.extractWorkbookFromFile(file);
        setWorkbook(wb);
      } catch (e) {
        console.log(e);
        setErrors([e.message]);
      }
    };
    extractWorkbook();
  }, []);

  useEffect(() => {
    console.log("errors updated");
    console.log(errors);
  }, [errors]);

  useEffect(() => {
    console.log(`${progressInfo} percent: ${progress}`);
  }, [progress]);

  //Generates the loadprofiles from the given data
  useEffect(() => {
    const parseWorkbook = async () => {
      if (workbook === null) return;
      console.log("Parsing workbook...");

      setSettings(LoadProfileStorage.loadSettings());

      let lp_rawDatas: LoadProfile_Raw[] = [];
      handleProgressUpdate(`Parsing ...`, 10);
      for (let sheetName of workbook.SheetNames) {
        // handleProgressUpdate(`Parsing ${sheetName}`, 0);

        console.log("Parsing worksheet: " + sheetName);
        let worksheet = workbook.Sheets[sheetName];
        let range = XLSX.utils.decode_range(worksheet["!ref"] as string);
        const totalRows = range.e.r - range.s.r;
        for (let row = 0; row <= range.e.r; row++) {
          const percent = (row / totalRows) * 100;
          handleProgressUpdate(`processing row ${row}/${totalRows}`, percent);
          try {
            let cells = await extractCells(worksheet, row, sheetName);
            let rawData = await extractDataFromRow(cells);
            // console.log(`Row pushed: ${rawData.row}`);
            // console.log(rawData);
            lp_rawDatas.push(rawData);
          } catch (e) {
            setErrors((prevVal) => [...prevVal, e.message]);
          }
        }
      }
      console.log("finished");
      handleProgressUpdate("Finished (:", 100);
      handleFileParsed(lp_rawDatas);
    };
    parseWorkbook();
  }, [workbook]);

  function handleFileParsed(lp_rawDatas: LoadProfile_Raw[]) {
    // onFileParsed(lp_rawDatas);
  }

  function handleProgressUpdate(info: string, percent: number) {
    setProgress(percent);
    setsProgressInfo(info);
  }

  //Extracts the load profile raw data from the row,
  async function extractCells(
    worksheet: WorkSheet,
    row: number,
    sheetName: string
  ): Promise<LoadProfileRowData> {
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

  async function extractDataFromRow(
    rowData: LoadProfileRowData
  ): Promise<LoadProfile_Raw> {
    let error = null;
    let anyErrors = false;
    let rawData: LoadProfile_Raw | null = null;

    let kwdelCellData = await extractKwdelCellData(rowData.kwdelCell);
    let dateCellData = await extractDateCellData(rowData.dateCell);
    let timeCellData = await extractTimeCellData(rowData.timeCell);

    anyErrors = Boolean(
      kwdelCellData.error || dateCellData.error || timeCellData.error
    );
    if (anyErrors) {
      error = `Errors in row ${rowData.row + 1}: \n`;
      if (kwdelCellData.error)
        error = error.concat(`\t${kwdelCellData.error}\n`);
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

    return rawData;
  }

  async function extractKwdelCellData(
    kwdelCell: CellObject
  ): Promise<{ error: string | null; value: number | null }> {
    let error = null;
    let value = null;
    if (!(kwdelCell.t === "n" || Number(kwdelCell.v || kwdelCell.w))) {
      error = `KwdelCell expectations: number received: ${kwdelCell.v}`;
    } else {
      value = Number(kwdelCell.v || kwdelCell.r);
    }
    return { error, value };
  }

  async function extractDateCellData(
    dateCell: CellObject
  ): Promise<{ error: string | null; value: Date | null }> {
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
        x = moment(
          dateCell.v || dateCell.w || dateCell.r,
          settings.dateFormat,
          true
        );
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

    // console.log({
    //   DateCellRaw: dateCell.w,
    //   value,
    //   error,
    // });

    return { error, value };
  }

  async function extractTimeCellData(
    timeCell: CellObject
  ): Promise<{ error: string | null; value: Date | null }> {
    let error: string | null = null;
    let value = null;
    let x: any = null;
    if (timeCell.t !== "d") {
      if (timeCell.t === "s") {
        x = moment(timeCell.v || timeCell.w || timeCell.r, settings.timeFormat);
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

  return (
    <React.Fragment>
      {render({ progress, progressInfo, fileFromParser: file, errors })}
    </React.Fragment>
  );
};

export default LoadProfileParser;
