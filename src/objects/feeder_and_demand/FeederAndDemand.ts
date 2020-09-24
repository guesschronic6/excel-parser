import BillingPeriod from "../common/BillingPeriod";
import { calculateOperatingHours } from "./FeederAndDemandUtils";
import { FeederAndDemandObject } from "./types";

class FeederAndDemand {
  billingPeriod: BillingPeriod;

  feederAndDemandDatas: Map<string, FeederAndDemandObject>;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.feederAndDemandDatas = new Map();
  }

  addData(data: FeederAndDemandObject) {
    this.feederAndDemandDatas.set(data.feeder, data);
  }
}

export default FeederAndDemand;
