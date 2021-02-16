import LoadProfile_Raw from "./LoadProfile_Raw";
import LoadProfile from "./LoadProfile";
import { BillingPeriod } from "../../common/object";
import { LoadProfileMax, LoadProfileSum } from "./types";
import CoincidentPeak from "./CoincidentPeak";
import HourlyLoadProfile from "./HourlyLoadProfile";
import DailyLoadProfile from "./DailyLoadProfile";

class MonthlyLoadProfile {
  loadProfiles: Map<string, LoadProfile>;
  billingPeriod: BillingPeriod;
  dateStrings: Set<string>;
  coincidentPeak: CoincidentPeak;
  nonCoincidentPeak: number;
  diversityFactor: number;
  loadProfilesMax: LoadProfileMax[];
  loadProfilesSum: LoadProfileSum[];
  totalLoadpRofile: LoadProfile;
  chartData: Map<string, any>;

  constructor(billingPeriod: BillingPeriod) {
    this.billingPeriod = billingPeriod;
    this.loadProfiles = new Map();
    this.dateStrings = new Set();
    this.totalLoadpRofile = new LoadProfile("Total");
    this.coincidentPeak = new CoincidentPeak();
    this.nonCoincidentPeak = 0;
    this.diversityFactor = 0;
    this.loadProfilesMax = [];
    this.loadProfilesSum = [];
    this.chartData = new Map();
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

  removeData(fileName: string, meteringPoints: string[]) {
    meteringPoints.forEach((key) => {
      if (this.loadProfiles.has(key)) {
        let loadProfile = this.loadProfiles.get(key);
        loadProfile?.removeLoadPRofileData(fileName);
      }
    });
  }

  private resetData() {
    this.nonCoincidentPeak = 0;
    this.loadProfilesMax = [];
    this.loadProfilesSum = [];
    this.totalLoadpRofile = new LoadProfile("Total");
    this.chartData = new Map();
  }

  private extractDataThenAddToTotal(
    hourlyLoadProfile: HourlyLoadProfile,
    dailyLoadProfile: DailyLoadProfile
  ) {
    let rawData = new LoadProfile_Raw(
      hourlyLoadProfile.getTotalKwdel(),
      hourlyLoadProfile.getTotalKwhdel(),
      dailyLoadProfile.date.getDate(),
      dailyLoadProfile.date.getMonth() + 1,
      dailyLoadProfile.date.getFullYear(),
      hourlyLoadProfile.hour,
      3,
      "Total",
      0
    );
    let dateString = `${rawData.month}/${rawData.day}/${rawData.year}`;
    this.totalLoadpRofile.addLoadProfileData(rawData, dateString);
  }

  private extractDailyLoadProfileTotalKwdelThenAddToData(
    dailyLoadProfile: DailyLoadProfile,
    loadProfile: LoadProfile
  ) {
    let dateKey = `${
      dailyLoadProfile.date.getMonth() + 1
    }/${dailyLoadProfile.date.getDate()}`;

    if (!this.chartData.has(dateKey)) {
      let obj: any = { date: dateKey };
      obj[`${loadProfile.meteringPoint}`] = dailyLoadProfile.sum.kwdel;
      this.chartData.set(dateKey, obj);
    } else {
      let obj = this.chartData.get(dateKey);
      obj[`${loadProfile.meteringPoint}`] = dailyLoadProfile.sum.kwdel;
    }
  }

  initOtherDetails() {
    this.resetData();

    let hlpList: HourlyLoadProfile[] = [];

    for (let loadProfile of this.loadProfiles.values()) {
      for (let dailyLp of [...loadProfile.dailyLoadProfiles.values()]) {
        dailyLp.genMaxAndSum();
        for (let hourlyLp of dailyLp.hourlyLoadProfiles) {
          this.extractDataThenAddToTotal(hourlyLp, dailyLp);
        }
        this.extractDailyLoadProfileTotalKwdelThenAddToData(
          dailyLp,
          loadProfile
        );
      }
      const { max, sum } = loadProfile.genMaxAndSum();

      if (sum.kwdel === 0) {
        this.loadProfiles.delete(loadProfile.meteringPoint);
      } else {
        this.loadProfilesMax.push(max);
        this.loadProfilesSum.push(sum);
        this.nonCoincidentPeak += max.kwdel;
      }
    }

    for (let dlp of this.totalLoadpRofile.dailyLoadProfiles.values()) {
      for (let hlp of dlp.hourlyLoadProfiles) {
        if (hlp.getRawTotal() > this.coincidentPeak.kwdel) {
          this.coincidentPeak.kwdel = hlp.getRawTotal();
          this.coincidentPeak.date = dlp.date;
          this.coincidentPeak.hour = hlp.hour;
          this.coincidentPeak.meteringPoint = "Total";
        }
      }
    }

    this.diversityFactor = this.nonCoincidentPeak / this.coincidentPeak.kwdel;

    console.log({
      info: "max and sum",
      max: this.loadProfilesMax,
      sum: this.loadProfilesSum,
      coincidental: this.coincidentPeak,
      nonCoincidental: this.nonCoincidentPeak,
      diversityFactor: this.diversityFactor,
      totalLoadProfile: this.totalLoadpRofile,
      chartData: this.chartData,
      hourlyLoadpRofiles: hlpList,
    });
  }
}

export default MonthlyLoadProfile;
