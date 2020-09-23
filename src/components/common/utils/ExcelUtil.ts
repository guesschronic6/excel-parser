import moment from "moment";
import { CellObject } from "xlsx/types";

class ExcelUtil {
  static extractDate(cell: CellObject, dateFormat: string): Date {
    let x = null;
    if (cell) {
      if (cell.t !== "d") {
        if (cell.t === "s") {
          x = moment(cell.v || cell.w || cell.r, dateFormat);
          if (!x.isValid()) {
            throw new Error(
              ` ${cell.v} does not match the date format in setstings ${dateFormat}`
            );
          } else {
            return x.toDate();
          }
        } else {
          throw new Error(
            `Invalid Cell Value: Expected Date, received: ${cell.v}`
          );
        }
      } else {
        return cell.v as Date;
      }
    } else {
      throw new Error("Cell is empty");
    }
  }

  static extractNumber(cell: CellObject): number {
    if (cell) {
      if (!(cell.t === "n" || Number(cell.v || cell.w))) {
        throw new Error(
          `Invalid Cell Value: Expected number, received: ${cell.v}`
        );
      } else {
        return Number(cell.r || cell.v);
      }
    } else {
      throw new Error("Cell is empty");
    }
  }
}

export default ExcelUtil;
