import { BillingPeriod } from "../../common/object";
import PowerTransformerLoss from "./PowerTransformerLoss";

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

  initValues() {
    [...this.powerTransformerLosses.values()].forEach((ptl) => {
      [...ptl.items.values()].forEach((pti) => {
        [...pti.substationItems.values()].forEach((item) => {
          item.initValues();
        });
      });
    });
  }

  addIfNotExistOrElseGet(billingpPeriod: BillingPeriod, fileName: string) {
    let key = billingpPeriod.toString();
    if (!this.powerTransformerLosses.has(key)) {
      this.powerTransformerLosses.set(
        key,
        new PowerTransformerLoss(billingpPeriod, fileName)
      );
    }
    return this.powerTransformerLosses.get(key) as PowerTransformerLoss;
  }
}

export default MonthlyPowerTransformerLoss;
