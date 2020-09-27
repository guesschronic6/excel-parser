import { WorkBook } from "xlsx/types";
import XLSX from "xlsx";
import InvalidFileError from "../errors/InvalidFileError";

async function extractWorkbookFromFile(file: File): Promise<WorkBook> {
  return new Promise<WorkBook>((resolve, reject) => {
    console.log("FileUTils: Timeout wait for 10 secs....");
    let fileExtension: string = file.name.split(".")[1];
    console.log({
      method: "extractWorkbookFromFile()",
      parameteres: { file },
      fileTypeSplit: file.name.split("."),
      fileExtension,
    });

    if (fileExtension !== "xlsx") {
      reject(
        new InvalidFileError(
          `Invalid file: expected: .xlsx received: ${fileExtension}`
        )
      );
    }

    let reader = new FileReader();
    reader.onload = function (event: ProgressEvent<FileReader>) {
      try {
        let data = new Uint8Array(event.target?.result as ArrayBuffer);
        let workbook = XLSX.read(data, { type: "array", cellDates: true });
        resolve(workbook);
      } catch (error) {
        reject(new Error(error));
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

const FileUtil = Object.freeze({
  extractWorkbookFromFile,
});

export default FileUtil;
