import BillingPeriod from "../../objects/common/BillingPeriod";
import MonthlyInterruptionItem from "../../objects/monthly_interruption/MonthlyInterruptionItem";
import PowerSubstationItem from "../../objects/power_substation/PowerSubstationItem";
import { PowerSubstationRawData } from "../../objects/power_substation/types";
import PowerTransformerLoss from "./PowerTransformerLoss";
import PowerTransformerLossItem from "./PowerTransformerLossItem";

class MonthlyPowerTransformerLoss {
  //key: billingpPeriod.toString(),
  powerTransformerLosses: Map<string, PowerTransformerLoss>;

  constructor(monthlyPowerTransformerLoss?: MonthlyPowerTransformerLoss) {
    if (monthlyPowerTransformerLoss) {
      this.powerTransformerLosses = new Map(
        monthlyPowerTransformerLoss.powerTransformerLosses
      );
    } else {
      this.powerTransformerLosses = new Map();
    }
    console.log("MonthlyPowerTransformerLoss created..");
  }

  replacePowerTransformerLossItem(
    item: PowerTransformerLossItem,
    billingPeriod: BillingPeriod
  ) {
    this.powerTransformerLosses
      .get(billingPeriod.toString())
      ?.replacePowerTransformerlossItem(item);
  }

  removePowerSubstationData(fileName: string) {
    for (let key of this.powerTransformerLosses.keys()) {
      if (this.powerTransformerLosses.get(key)?.fileName === fileName) {
        this.powerTransformerLosses.delete(key);
      }
    }
  }

  addRawPowerSubstationData(rawData: PowerSubstationRawData) {
    this.addIfNotExist(rawData.billingPeriod, rawData.fileName);
    this.powerTransformerLosses
      .get(rawData.billingPeriod.toString())
      ?.addPowerSubstationData(rawData);
  }

  initValues() {
    [...this.powerTransformerLosses.values()].forEach((ptl) => {
      [...ptl.items.values()].forEach((pti) => {
        [...pti.substationItems.values()].forEach((item) => {
          item.initValues();
        });
      });
    });
  }

  private addIfNotExist(billingpPeriod: BillingPeriod, fileName: string) {
    let key = billingpPeriod.toString();
    if (!this.powerTransformerLosses.has(key)) {
      console.log(
        "Adding new PowerTransformerLoss, billing period: " +
          billingpPeriod.toString()
      );
      this.powerTransformerLosses.set(
        key,
        new PowerTransformerLoss(billingpPeriod, fileName)
      );
    }
  }
}

export default MonthlyPowerTransformerLoss;
