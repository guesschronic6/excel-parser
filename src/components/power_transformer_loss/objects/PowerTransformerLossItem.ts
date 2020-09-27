import { SubstationItem } from "../../common/object";
import { PowerSubstationRawData } from "../../power_substation/types";

class PowerTransformerLossItem {
  substationItem: SubstationItem;
  energMwhr: number;
  demandMW: number;
  powerFactor: number;
  loadMVA: number;
  percentLoading: number;
  operationHours: number;
  averageLoad: number;
  loadFactor: number;
  lossFactor: number;
  coreLoss: number;
  windingLoss: number;
  auxiliaryLoss: number;
  totalLosses: number;
  rawDemand: { fileName: string; value: number }[];
  rawEnergyMwh: { fileName: string; value: number }[];
  rawKvarhrEnergy: { fileName: string; value: number }[];

  constructor(
    substationItem: SubstationItem,
    operationHours: number,
    item?: PowerTransformerLossItem
  ) {
    if (item) {
      this.substationItem = item.substationItem;
      this.operationHours = item.operationHours;
      this.energMwhr = item.energMwhr;
      this.demandMW = item.demandMW;
      this.powerFactor = item.powerFactor;
      this.loadMVA = item.loadMVA;
      this.percentLoading = item.percentLoading;
      this.averageLoad = item.averageLoad;
      this.loadFactor = item.loadFactor;
      this.lossFactor = item.lossFactor;
      this.coreLoss = item.coreLoss;
      this.windingLoss = item.windingLoss;
      this.auxiliaryLoss = item.auxiliaryLoss;
      this.totalLosses = item.totalLosses;
      this.rawDemand = item.rawDemand;
      this.rawEnergyMwh = item.rawEnergyMwh;
      this.rawKvarhrEnergy = item.rawKvarhrEnergy;
    } else {
      this.substationItem = substationItem;
      this.operationHours = operationHours;
      this.energMwhr = 0;
      this.demandMW = 0;
      this.powerFactor = 0;
      this.loadMVA = 0;
      this.percentLoading = 0;
      this.averageLoad = 0;
      this.loadFactor = 0;
      this.lossFactor = 0;
      this.coreLoss = 0;
      this.windingLoss = 0;
      this.auxiliaryLoss = 0;
      this.totalLosses = 0;
      this.rawDemand = [];
      this.rawEnergyMwh = [];
      this.rawKvarhrEnergy = [];
    }

    console.log(
      "PowerTransformerLossItem Created: " + substationItem.toString()
    );
  }

  addPowerSubstatoinData(data: PowerSubstationRawData) {
    console.log("Adding power substation data");
    console.log({ data });
    this.rawEnergyMwh.push({
      fileName: data.fileName,
      value: data.kwhrEnergy,
    });
    this.rawDemand.push({ fileName: data.fileName, value: data.demandKwhr });
    this.rawKvarhrEnergy.push({
      fileName: data.fileName,
      value: data.kvarhrEnergy,
    });
  }

  refreshData() {
    this.rawDemand = [];
    this.rawEnergyMwh = [];
    this.rawKvarhrEnergy = [];
  }

  initValues() {
    this.energMwhr = this.getTotal(this.rawEnergyMwh) / 1000;
    let totalKvarhr = this.getTotal(this.rawKvarhrEnergy) / 1000;
    this.powerFactor = this.getPowerFactor(totalKvarhr, this.energMwhr);
    this.loadMVA = this.getLoadMva(this.demandMW, this.powerFactor); /////////
    this.percentLoading = this.getPercentLoading(
      this.loadMVA,
      this.substationItem.transformer.power
    );
    this.loadFactor = this.getLoadFactor(
      this.energMwhr,
      this.demandMW,
      this.operationHours
    ); ///////////
    this.averageLoad = this.getAverageLoad(this.demandMW, this.loadFactor); ////////
    this.lossFactor = this.getLossFactor(this.loadFactor);
    this.coreLoss = this.getCoreLoss(
      this.substationItem.transformer.power,
      this.operationHours
    );
    this.windingLoss = this.getWindingLoss(
      this.percentLoading,
      this.lossFactor,
      this.operationHours
    );
    this.auxiliaryLoss = this.getAuxiliaryLoss(this.operationHours);
    this.totalLosses = this.getTotalLosses(
      this.coreLoss,
      this.auxiliaryLoss,
      this.windingLoss
    );
  }

  private getTotal(rawSet: { fileName: string; value: number }[]) {
    let total = 0;
    for (let raw of rawSet) {
      total += raw.value;
    }
    return total ? total : 0;
  }

  private getPowerFactor(kvarhr: number, kwhr: number) {
    let pf = Math.cos(Math.atan(kvarhr / kwhr)) * 100;
    return pf ? pf : 0;
  }

  private getLoadMva(demand: number, powerFactor: number) {
    let lmva = (demand * 100) / powerFactor;
    return lmva ? lmva : 0;
  }

  private getPercentLoading(loadMva: number, powerTransformer: number) {
    let pl = (loadMva * 100) / powerTransformer;
    return pl ? pl : 0;
  }

  private getLoadFactor(
    energyMwh: number,
    demand: number,
    operationHours: number
  ) {
    let bottom = demand * operationHours;
    let lf = energyMwh / bottom;
    return lf ? lf : 0;
  }

  private getAverageLoad(demand: number, loadFactor: number) {
    let avl = demand * loadFactor;
    return avl ? avl : 0;
  }

  private getLossFactor(lossFactor: number) {
    let lf = 0.2 * lossFactor + 0.8 * (lossFactor * lossFactor);
    return lf ? lf : 0;
  }

  private getCoreLoss(transformerPower: number, operationHours: number) {
    let cl = transformerPower * operationHours;
    return cl ? cl : 0;
  }

  private getWindingLoss(
    percentLoading: number,
    lossFactor: number,
    operationHours: number
  ) {
    let wl =
      77 *
      (percentLoading / 100) *
      (percentLoading / 100) *
      lossFactor *
      operationHours;
    return wl ? wl : 0;
  }

  private getAuxiliaryLoss(operationHours: number) {
    let al = 2 * 3 * (operationHours / 24);
    return al ? al : 0;
  }

  private getTotalLosses(
    coreLoss: number,
    windingLoss: number,
    auxiliaryLoss: number
  ) {
    return coreLoss + windingLoss + auxiliaryLoss;
  }
}

export default PowerTransformerLossItem;
