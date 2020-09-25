import BillingPeriod from "../../objects/common/BillingPeriod";
import MonthlyInterruptionItem from "../../objects/monthly_interruption/MonthlyInterruptionItem";
import PowerSubstationItem from "../../objects/power_substation/PowerSubstationItem";
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

  addPowerSubstationData(
    data: PowerSubstationItem,
    billingpPeriod: BillingPeriod
  ) {
    this.addIfNotExist(billingpPeriod);
    this.powerTransformerLosses
      .get(billingpPeriod.toString())
      ?.addPowerSubstationData(data);
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

  private addIfNotExist(billingpPeriod: BillingPeriod) {
    let key = billingpPeriod.toString();
    if (!this.powerTransformerLosses.has(key)) {
      console.log(
        "Adding new PowerTransformerLoss, billing period: " +
          billingpPeriod.toString()
      );
      this.powerTransformerLosses.set(
        key,
        new PowerTransformerLoss(billingpPeriod)
      );
    }
  }
}

export default MonthlyPowerTransformerLoss;
