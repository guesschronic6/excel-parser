import Substation, {
  SubstationItem,
} from "../../objects/common/enums/Substation";
import { calculateOperatingHours } from "../../objects/feeder_and_demand/FeederAndDemandUtils";
import MonthlyInterruptionItem from "../../objects/monthly_interruption/MonthlyInterruptionItem";
import PowerSubstationItem from "../../objects/power_substation/PowerSubstationItem";

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

  constructor(substationItem: SubstationItem, operationHours: number) {
    this.substationItem = substationItem;
    this.operationHours = operationHours;
    this.energMwhr = 0;
    this.demandMW = 17.02;
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
    console.log(
      "PowerTransformerLossItem Created: " + substationItem.toString()
    );
  }

  addPowerSubstatoinData(data: PowerSubstationItem) {
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
    return total;
  }

  private getPowerFactor(kvarhr: number, kwhr: number) {
    return Math.cos(Math.atan(kvarhr / kwhr)) * 100;
  }

  private getLoadMva(demand: number, powerFactor: number) {
    return (demand * 100) / powerFactor;
  }

  private getPercentLoading(loadMva: number, powerTransformer: number) {
    return (loadMva * 100) / powerTransformer;
  }

  private getLoadFactor(
    energyMwh: number,
    demand: number,
    operationHours: number
  ) {
    let bottom = demand * operationHours;
    return energyMwh / bottom;
  }

  private getAverageLoad(demand: number, loadFactor: number) {
    return demand * loadFactor;
  }

  private getLossFactor(lossFactor: number) {
    return 0.2 * lossFactor + 0.8 * (lossFactor * lossFactor);
  }

  private getCoreLoss(transformerPower: number, operationHours: number) {
    return transformerPower * operationHours;
  }

  private getWindingLoss(
    percentLoading: number,
    lossFactor: number,
    operationHours: number
  ) {
    return (
      77 *
      (percentLoading / 100) *
      (percentLoading / 100) *
      lossFactor *
      operationHours
    );
  }

  private getAuxiliaryLoss(operationHours: number) {
    return 2 * 3 * (operationHours / 24);
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
