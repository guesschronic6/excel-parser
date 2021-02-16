import XLSX from "xlsx";
import { PowerSubstationRawData } from "../power_substation/types";
import { MonthlyInterruptionRawData } from "../monthly_interruption/types";
import { MonthlyFeederAndDemand, FeederAndDemand } from "./objects";
import { BillingPeriod } from "../common/object";

const FeederAndDemandUtil = Object.freeze({
  removePowerSubstationFile,
  removeMonthlyInterruptionFile,
  addPowerSubstationRawData,
  addMonthlyInterruptionRawData,
  addPowerSubstationRawDataAsync,
  addMonthlyInterruptionRawDataAsync,
  removePowerSubstationFileAsync,
  removeMonthlyInterruptionFileAsync,
  generateExcelFile,
  calculateOperatingHours,
});

async function addPowerSubstationRawDataAsync(
  rawDatas: PowerSubstationRawData[],
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  return addPowerSubstationRawData(rawDatas, monthlyFeederAndDemand);
}

async function addMonthlyInterruptionRawDataAsync(
  rawDatas: MonthlyInterruptionRawData[],
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  return addMonthlyInterruptionRawData(rawDatas, monthlyFeederAndDemand);
}

async function removePowerSubstationFileAsync(
  fileName: string,
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  return removePowerSubstationFile(fileName, monthlyFeederAndDemand);
}

async function removeMonthlyInterruptionFileAsync(
  fileName: string,
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  return removeMonthlyInterruptionFile(fileName, monthlyFeederAndDemand);
}

function addPowerSubstationRawData(
  rawDatas: PowerSubstationRawData[],
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  rawDatas.forEach((rawData) => {
    monthlyFeederAndDemand
      .addFeederAndDemandIfNotExists(rawData.billingPeriod)
      .addItemIfNotExistElseGet(rawData.feeder)
      .setPowerSubstationData(rawData);
  });
  return monthlyFeederAndDemand;
}

function addMonthlyInterruptionRawData(
  rawDatas: MonthlyInterruptionRawData[],
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  console.log({ message: "Processing raw datas" });
  rawDatas.forEach((rawData) => {
    let item = monthlyFeederAndDemand
      .addFeederAndDemandIfNotExists(rawData.billingPeriod)
      .addItemIfNotExistElseGet(rawData.feeder);
    console.log({
      message: "Adding rawData to item feeder: ",
      itemFeeder: item.feeder,
    });
    item.addRawMonthlyInterruptionData(rawData);
  });
  return monthlyFeederAndDemand;
}

function removePowerSubstationFile(
  fileName: string,
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  [...monthlyFeederAndDemand.feederAndDemands.values()].forEach(
    (feederAndDemand) => {
      [...feederAndDemand.items.values()].forEach((feederAndDemandItem) => {
        feederAndDemandItem.removePowerSubstationData(fileName);
      });
    }
  );

  return monthlyFeederAndDemand;
}

function removeMonthlyInterruptionFile(
  fileName: string,
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  [...monthlyFeederAndDemand.feederAndDemands.values()].forEach(
    (feederAndDemand) => {
      [...feederAndDemand.items.values()].forEach((feederAndDemandItem) => {
        feederAndDemandItem.removeMonthlyInterruptionData(fileName);
      });
    }
  );

  return monthlyFeederAndDemand;
}

function generateExcelFile(feederAndDemand: FeederAndDemand) {
  let workbook = XLSX.utils.book_new();
  let worksheetName = `${feederAndDemand.billingPeriod.toString()}`;
  let worksheetData = generateSheetData(feederAndDemand);
  let worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(
    workbook,
    `Monthly Feeder And Demand Report of ${feederAndDemand.billingPeriod.toString()}.xlsx`
  );
}

function calculateOperatingHours(hours: number, billingPeriod: BillingPeriod) {
  return (billingPeriod.getTotalDays() + 1) * 24 - hours;
}

function generateSheetData(feederAndDemand: FeederAndDemand) {
  let data = [];

  //---------CREATING HEADERS-------------
  let first = ["", "", "", "Power Outages"];
  let second = [
    "",
    "",
    "",
    `${feederAndDemand.billingPeriod.startDate.toLocaleDateString()} ~ ${feederAndDemand.billingPeriod.enddDate.toLocaleDateString()}`,
  ];
  let third = [
    "Feeders",
    "Feeder Input",
    "Deamnd",
    "Minutes",
    "Hours",
    "Operating Hours",
    "Power Factor",
    "Load Factor",
  ];

  data.push(first, second, third);

  //----------CONTENT----------------
  for (let item of feederAndDemand.items.values()) {
    data.push([
      item.feeder,
      item.feederInput.toFixed(2),
      item.demand.toFixed(2),
      item.totalMinutes.toString(),
      item.totalHours.toFixed(2),
      item.operatingHours.toFixed(2),
      item.powerFactor.toFixed(2),
      item.loadFactor.toFixed(2),
    ]);
  }
  console.log(data);
  return data;
}

export default FeederAndDemandUtil;
