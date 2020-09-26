import PowerTransformerLoss from "./PowerTransformerLoss";
import XLSX from "xlsx";

const PowerTransformerLossUtil = Object.freeze({ generateExcelFile });

function generateExcelFile(powerTransformerLoss: PowerTransformerLoss) {
  let workbook = XLSX.utils.book_new();
  let worksheetName = `${powerTransformerLoss.billingPeriod.toString()}`;
  let worksheetData = generateSheetData(powerTransformerLoss);
  let worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
  XLSX.utils.book_append_sheet(workbook, worksheet, worksheetName);
  XLSX.writeFile(
    workbook,
    `Monthly Power Transformer Loss Report of ${powerTransformerLoss.billingPeriod.toString()}.xlsx`
  );
}

function generateSheetData(powerTransformerLoss: PowerTransformerLoss) {
  let data = [];

  //---------CREATING HEADERS-------------

  let header = [
    "Substation",
    "Power Transformer",
    "Brand",
    "Energy (MWHR)",
    "Demand (MW)",
    "Power Factor",
    "Load (MVA)",
    "Percent Loading",
    "Operation Hours",
    "Ave. Load (MW)",
    "Load Factor",
    "Loss Factor",
    "Core Loss",
    "Winding Loss",
    "Auxiliary Loss",
    "Total Losses",
  ];

  data.push(header);

  //----------CONTENT----------------
  for (let substation of powerTransformerLoss.items.values()) {
    for (let item of substation.substationItems.values()) {
      data.push([
        substation.substation.text,
        `${item.substationItem.transformer.power} mVA`,
        item.substationItem.transformer.brand,
        item.energMwhr.toFixed(2),
        item.demandMW.toFixed(2),
        item.powerFactor.toFixed(2),
        item.loadMVA.toFixed(2),
        item.percentLoading.toFixed(2),
        item.operationHours.toFixed(2),
        item.averageLoad.toFixed(2),
        item.loadFactor.toFixed(2),
        item.coreLoss.toFixed(2),
        item.windingLoss.toFixed(2),
        item.auxiliaryLoss.toFixed(2),
        item.totalLosses.toFixed(2),
      ]);
    }
  }
  console.log(data);
  return data;
}
export default PowerTransformerLossUtil;
