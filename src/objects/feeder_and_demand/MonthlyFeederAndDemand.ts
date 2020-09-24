import BillingPeriod from "../common/BillingPeriod";
import { MonthlyInterruptionObject } from "../monthly_interruption/types";
import { PowerSubstationObject } from "../power_substation/types";
import FeederAndDemand from "./FeederAndDemand";
import { createObject } from "./FeederAndDemandUtils";
import { FeederAndDemandObject } from "./types";

class MonthlyFeederAndDemand {
  feederAndDemands: Map<string, FeederAndDemand>;

  constructor() {
    this.feederAndDemands = new Map();
  }

  addData(data: FeederAndDemandObject, billingPeriod: BillingPeriod) {
    if (!this.feederAndDemands.has(billingPeriod.toString())) {
      this.feederAndDemands.set(
        billingPeriod.toString(),
        new FeederAndDemand(billingPeriod)
      );
    }
    let fd = this.feederAndDemands.get(
      billingPeriod.toString()
    ) as FeederAndDemand;
    fd.addData(data);
  }
}

export default MonthlyFeederAndDemand;
