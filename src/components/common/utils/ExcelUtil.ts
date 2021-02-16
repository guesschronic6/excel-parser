import moment from "moment";
import { CellObject } from "xlsx/types";

class ExcelUtil {
  static extractDate(
    cell: CellObject,
    dateFormat: string
  ): { date: Date | null; error: string | null } {
    let date: Date | null = null;
    let error: string | null = null;
    let x = null;
    if (cell) {
      if (cell.t !== "d") {
        if (cell.t === "s") {
          x = moment(cell.v || cell.w || cell.r, dateFormat);
          if (!x.isValid()) {
            error = ` ${cell.v} does not match the date format in setstings ${dateFormat}`;
          } else {
            date = x.toDate();
          }
        } else {
          error = `Invalid Cell Value: Expected Date, received: ${cell.v}`;
        }
      } else {
        date = cell.v as Date;
      }
    } else {
      error = "Cell is empty";
    }

    return { date, error };
  }

  static extractNumber(
    cell: CellObject,
    strict: boolean = false
  ): { number: number | null; error: string | null } {
    let number: number | null = null;
    let error: string | null = null;
    if (cell) {
      if (!(cell.t === "n" || Number(cell.v || cell.w))) {
        error = `Invalid Cell Value: Expected number, received: ${cell.v}`;
      } else {
        number = Number(cell.r || cell.v);
      }
    } else {
      if (strict) {
        error = "Cell is empty";
      } else {
        number = 0;
      }
    }

    return { number, error };
  }

  static extractText(
    cell: CellObject
  ): { text: string | null; error: string | null } {
    let error: string | null = null;
    let text: string | null = null;
    if (cell) {
      if (cell.t !== "s") {
        error = `Invalid Cell Value: Expected Text, received: ${cell.v}`;
      } else {
        text = cell.v as string;
      }
    } else {
      error = "Cell is empty";
    }
    return { text, error };
  }

  static calculatePercent(i: number, total: number): Promise<number> {
    return new Promise<number>((resolve, reject) => {
      setTimeout(() => {
        resolve((i / total) * 100);
      }, 0);
    });
  }
}

export default ExcelUtil;
