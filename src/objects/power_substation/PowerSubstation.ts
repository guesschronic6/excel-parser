import { Month } from "../../components/enums";
import BillingPeriod from "../common/BillingPeriod";
import Feeder from "../common/enums/Feeder";
import PowerSubstationItem from "./PowerSubstationItem";
import { PowerSubstationRawData } from "./types";

class PowerSubstation {
  items: Map<Feeder, PowerSubstationItem>;
  billingPeriod: BillingPeriod;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.items = new Map();
  }

  addRawData(rawData: PowerSubstationRawData) {
    this.items.set(rawData.feeder, new PowerSubstationItem(rawData));
  }

  removeFile(fileName: string) {
    for (let key of this.items.keys()) {
      if (this.items.get(key)?.fileName === fileName) {
        this.items.delete(key);
      }
    }
  }
}

export default PowerSubstation;
