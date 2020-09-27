import PowerTransformerLossSubstation from "./PowerTransformerLossSubstation";

import { Substation, BillingPeriod } from "../../common/object";

class PowerTransformerLoss {
  billingPeriod: BillingPeriod;
  //key: substation
  items: Map<string, PowerTransformerLossSubstation>;
  operatingHours: number;
  fileName: string;

  constructor(billingPeriod: BillingPeriod, fileName: string) {
    this.billingPeriod = billingPeriod;
    this.operatingHours = (billingPeriod.getTotalDays() + 1) * 24;
    this.items = new Map();
    this.fileName = fileName;
  }

  addIfNotExistsOrElseGet(substation: Substation) {
    let key = substation.key;
    if (!this.items.has(key)) {
      console.log(
        "Adding new PowerTransformerSubstationItem, subtation: " +
          substation.key
      );
      this.items.set(
        key,
        new PowerTransformerLossSubstation(substation, this.operatingHours)
      );
    }
    return this.items.get(key) as PowerTransformerLossSubstation;
  }
}

export default PowerTransformerLoss;
