import { WorkSheet } from "xlsx/types";
import { FileUtil } from "../utils";
import XLSX from "xlsx";

class LoadProfileExcelParser {
  worksheets: WorkSheet[];
  file: File;

  constructor(file: File) {
    this.worksheets = [];
    this.file = file;
    console.log({
      method: "constructor()",
      params: { file },
    });
  }

  async extractMonthlyLoadProfileFromFile() {
    try {
      let workbook = await FileUtil.extractWorkbookFromFile(this.file);
      let sheets: any = workbook.Sheets;

      console.log({ workbook, sheets });

      workbook.SheetNames.forEach((sheetName) => {
        let sheet = workbook.Sheets[sheetName];
        let range = XLSX.utils.decode_range(sheet["!ref"] as string);
        console.log({ sheetName, sheet, range });
      });
    } catch (error) {
      console.log(error);
      return error.message;
    }
  }
}

export default LoadProfileExcelParser;
