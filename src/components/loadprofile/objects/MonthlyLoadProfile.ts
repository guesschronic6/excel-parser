import { Month } from "../../enums";
import LoadProfile_Raw from "./LoadProfile_Raw";
import LoadProfile from "./LoadProfile";
import BillingPeriod from "../../common/BillingPeriod";

class MonthlyLoadProfile {
  loadProfiles: Map<string, LoadProfile>;
  billingPeriod: BillingPeriod;
  dateStrings: Set<string>;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.loadProfiles = new Map();
    this.dateStrings = new Set();
  }

  addData(rawData: LoadProfile_Raw) {
    let key = rawData.meteringPoint;
    let dateString = `${rawData.month}/${rawData.day}/${rawData.year}`;

    if (!this.dateStrings.has(dateString)) {
      this.dateStrings.add(dateString);
    }

    if (!this.loadProfiles.has(key)) {
      this.loadProfiles.set(key, new LoadProfile(key));
    }
    this.loadProfiles.get(key)?.addLoadProfileData(rawData, dateString);
  }
}

export default MonthlyLoadProfile;
