import BillingPeriod from "../../objects/common/BillingPeriod";

import PowerSubstationItem from "../../objects/power_substation/PowerSubstationItem";
import PowerTransformerLossSubstation from "./PowerTransformerLossSubstation";

import GeneralUtil from "../../objects/common/GeneralUtil";
import Substation from "../../objects/common/enums/Substation";
import PowerTransformerLossItem from "./PowerTransformerLossItem";
import { PowerSubstationRawData } from "../../objects/power_substation/types";

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

  replacePowerTransformerlossItem(item: PowerTransformerLossItem) {
    this.items
      .get(item.substationItem.substationKey)
      ?.replacePowerTransformerLossItem(item);
  }

  addPowerSubstationData(data: PowerSubstationRawData) {
    console.log("findgin substation of feeder: " + data.feeder);
    let substation = GeneralUtil.findSubstationOfFeeder(data.feeder);
    if (substation) {
      console.log("substation foud: " + substation.key);
      this.addIfNotExisting(substation);
      this.items.get(substation.key)?.addPowerSubstationData(data);
    } else {
      console.log("substation not found :<");
    }
  }

  private addIfNotExisting(substation: Substation) {
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
  }
}

export default PowerTransformerLoss;
