import { Month } from "../../enums";
import LoadProfile_Raw from "./LoadProfile_Raw";
import LoadProfile from "./LoadProfile";
import BillingPeriod from "../../common/BillingPeriod";
import MeteringPoint from "../enums/MeteringPoints";
import {
  CoincidentalPeak,
  DiversityFactor,
  LoadProfileMax,
  LoadProfileSum,
  NoneCoincidentalPeak,
} from "../types";

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

  getCoincidentalPeakAndNonCoincidentalpeak(): {
    coincidentPeak: CoincidentalPeak;
    nonCoincidentPeak: NoneCoincidentalPeak;
    diversityFactor: DiversityFactor;
    loadProfilesMax: LoadProfileMax[];
    loadProfilesSum: LoadProfileSum[];
  } {
    let coincidentKwdel = 0;
    let coincidentMeteringPoint = MeteringPoint.MF3MPITZAMC01.toString();
    let coincidentDate = new Date();
    let coincidentHour = 0;

    let nonCoincidentKwdel = 0;
    let loadProfilesMax: LoadProfileMax[] = [];
    let loadProfilesSum: LoadProfileSum[] = [];

    for (let loadProfile of this.loadProfiles.values()) {
      const { max, sum } = loadProfile.getMaxAndSum();
      loadProfilesMax.push(max);
      loadProfilesSum.push(sum);
      if (max.kwdel > coincidentKwdel) {
        coincidentKwdel = max.kwdel;
        coincidentDate = max.date;
        coincidentHour = max.hour;
        coincidentMeteringPoint = max.meteringPoint;

        nonCoincidentKwdel += sum.kwdel;
      }
    }

    let diversityFactor = nonCoincidentKwdel / coincidentKwdel;

    return {
      coincidentPeak: {
        kwdel: coincidentKwdel,
        date: coincidentDate,
        hour: coincidentHour,
        meteringPoint: coincidentMeteringPoint,
      },
      nonCoincidentPeak: { kwdel: nonCoincidentKwdel },
      diversityFactor: { factor: diversityFactor },
      loadProfilesSum,
      loadProfilesMax,
    };
  }
}

export default MonthlyLoadProfile;
