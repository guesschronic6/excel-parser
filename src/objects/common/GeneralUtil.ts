import { Month } from "../../components/enums";
import Feeder from "./enums/Feeder";

function findFeeder(feederText: String): string | null {
  feederText = feederText.toUpperCase().trim();
  for (let feeder of Object.values(Feeder)) {
    if (feeder.toUpperCase().trim() === feederText) {
      return feeder;
    }
  }

  return null;
}

function getMonths(): { month: string; monthNum: number }[] {
  let months: { month: string; monthNum: number }[] = [];

  let monthNum = 1;
  for (let month of Object.values(Month)) {
    if (isNaN(Number(month))) {
      months.push({ month: String(month), monthNum });
      monthNum++;
    }
  }

  return months;
}

function getYears(): number[] {
  let years: number[] = [];
  let yearNow = new Date().getFullYear();
  for (let year = 2012; year <= yearNow; year++) {
    years.push(year);
  }
  return years;
}

export { findFeeder, getMonths, getYears };
