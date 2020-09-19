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
  coincidentPeak: CoincidentalPeak | null;
  nonCoincidentPeak: NoneCoincidentalPeak | null;
  diversityFactor: DiversityFactor | null;
  loadProfilesMax: LoadProfileMax[];
  loadProfilesSum: LoadProfileSum[];
  totalLoadpRofile: LoadProfile;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.loadProfiles = new Map();
    this.dateStrings = new Set();
    this.totalLoadpRofile = new LoadProfile("Total");
    this.coincidentPeak = null;
    this.nonCoincidentPeak = null;
    this.diversityFactor = null;
    this.loadProfilesMax = [];
    this.loadProfilesSum = [];
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

  initOtherDetails() {
    let coincidentKwdel = 0;
    let coincidentMeteringPoint = MeteringPoint.MF3MPITZAMC01.toString();
    let coincidentDate = new Date();
    let coincidentHour = 0;
    let nonCoincidentKwdel = 0;

    this.loadProfilesMax = [];
    this.loadProfilesSum = [];
    this.totalLoadpRofile = new LoadProfile("Total");

    for (let loadProfile of this.loadProfiles.values()) {
      for (let dailyLp of [...loadProfile.dailyLoadProfiles.values()]) {
        for (let hourlyLp of dailyLp.hourlyLoadProfiles) {
          let rawData = new LoadProfile_Raw(
            hourlyLp.getTotalKwdel(),
            dailyLp.date.getDate(),
            dailyLp.date.getMonth() + 1,
            dailyLp.date.getFullYear(),
            hourlyLp.hour,
            3,
            "Total",
            0
          );
          let dateString = `${rawData.month}/${rawData.day}/${rawData.year}`;
          this.totalLoadpRofile.addLoadProfileData(rawData, dateString);
        }
      }

      const { max, sum } = loadProfile.getMaxAndSum();
      console.log("max of " + loadProfile.meteringPoint);
      console.log(max);
      console.log("sum of " + loadProfile.meteringPoint);
      console.log(sum);
      this.loadProfilesMax.push(max);
      this.loadProfilesSum.push(sum);
      nonCoincidentKwdel += max.kwdel;
      console.log(nonCoincidentKwdel);
    }

    for (let dlp of this.totalLoadpRofile.dailyLoadProfiles.values()) {
      for (let hlp of dlp.hourlyLoadProfiles) {
        if (hlp.getRawTotal() > coincidentKwdel) {
          coincidentKwdel = hlp.getRawTotal();
          coincidentDate = dlp.date;
          coincidentHour = hlp.hour;
          coincidentMeteringPoint = "total";
        }
      }
    }

    let diversityFactor = nonCoincidentKwdel / coincidentKwdel;

    this.coincidentPeak = {
      kwdel: coincidentKwdel,
      date: coincidentDate,
      hour: coincidentHour,
      meteringPoint: coincidentMeteringPoint,
    };
    this.nonCoincidentPeak = { kwdel: nonCoincidentKwdel };
    this.diversityFactor = { factor: diversityFactor };

    console.log({
      info: "max and sum",
      max: this.loadProfilesMax,
      sum: this.loadProfilesSum,
      coincidental: this.coincidentPeak,
      nonCoincidental: this.nonCoincidentPeak,
      diversityFactor: this.diversityFactor,
      totalLoadProfile: this.totalLoadpRofile,
    });
  }
}

export default MonthlyLoadProfile;
