import MonthlyFeederAndDemand from "./MonthlyFeederAndDemand";
import XLSX from "xlsx";
import FeederAndDemand from "./FeederAndDemand";

const FeederAndDemandUtil = Object.freeze({
  removePowerSubstationFile,
  removeMonthlyInterruptionFile,
  generateExcelFile,
});

function removePowerSubstationFile(
  fileName: string,
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  let newData = new MonthlyFeederAndDemand(monthlyFeederAndDemand);
  [...newData.feederAndDemands.values()].forEach((feederAndDemand) => {
    [...feederAndDemand.items.values()].forEach((feederAndDemandItem) => {
      feederAndDemandItem.removePowerSubstationData(fileName);
    });
  });

  return newData;
}

function removeMonthlyInterruptionFile(
  fileName: string,
  monthlyFeederAndDemand: MonthlyFeederAndDemand
) {
  let newData = new MonthlyFeederAndDemand(monthlyFeederAndDemand);
  [...newData.feederAndDemands.values()].forEach((feederAndDemand) => {
    [...feederAndDemand.items.values()].forEach((feederAndDemandItem) => {
      feederAndDemandItem.removeMonthlyInterruptionData(fileName);
    });
  });

  return newData;
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
