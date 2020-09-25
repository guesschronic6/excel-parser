import { Month } from "../../components/enums";
import Feeder from "./enums/Feeder";
import Substation, { SubstationItem } from "./enums/Substation";

function findFeeder(feederText: String): string | null {
  feederText = feederText.toUpperCase().trim();
  for (let feeder of Object.values(Feeder)) {
    if (feeder.toUpperCase().trim() === feederText) {
      return feeder.toUpperCase().trim();
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

function isFeederExistsOnFeeders(feeder: Feeder, feeders: Feeder[]) {
  for (let f of feeders) {
    if (feeder.toUpperCase().trim() === f.toUpperCase().trim()) {
      return true;
    }
  }
  return false;
}

function findSubstationOfFeeder(feeder: Feeder) {
  let result = null;
  for (let substation of Substation.ALL) {
    for (let item of substation.substationItems.values()) {
      if (isFeederExistsOnFeeders(feeder, [...item.feeders.values()])) {
        return substation;
      }
    }
  }
  return result;
}

function findSubstationItemOfFeeder(feeder: Feeder, substation: Substation) {
  let result = null;

  for (let item of substation.substationItems.values()) {
    if (isFeederExistsOnFeeders(feeder, [...item.feeders.values()])) {
      return item;
    }
  }
  return result;
}

const GeneralUtil = Object.freeze({
  findSubstationOfFeeder,
  getYears,
  getMonths,
  findFeeder,
  findSubstationItemOfFeeder,
});

export default GeneralUtil;
export { findFeeder, getMonths, getYears };
