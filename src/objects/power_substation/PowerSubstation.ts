import { Month } from "../../components/enums";
import BillingPeriod from "../common/BillingPeriod";
import PowerSubstationItem from "./PowerSubstationItem";
import { PowerSubstationRawData } from "./types";

class PowerSubstation {
  items: Map<string, PowerSubstationItem>;
  billingPeriod: BillingPeriod;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.items = new Map();
  }

  addRawData(rawData: PowerSubstationRawData) {
    this.items.set(rawData.feeder, new PowerSubstationItem(rawData));
  }
}

export default PowerSubstation;
