import LoadProfile_Raw from "./LoadProfile_Raw";
import DailyLoadProfile from "./DailyLoadProfile";

class LoadProfile {
  meteringPoint: string;
  dailyLoadProfiles: Map<string, DailyLoadProfile>;

  constructor(meteringPoint: string) {
    this.meteringPoint = meteringPoint;
    this.dailyLoadProfiles = new Map();
  }

  addLoadProfileData(rawData: LoadProfile_Raw, dateString: string) {
    if (!this.dailyLoadProfiles.has(dateString)) {
      this.dailyLoadProfiles.set(
        dateString,
        new DailyLoadProfile(new Date(dateString))
      );
    }
    this.dailyLoadProfiles.get(dateString)?.addLoadProfileData(rawData);
  }

  getDailyLoadProfile(dateString: string): DailyLoadProfile {
    return this.dailyLoadProfiles.has(dateString)
      ? (this.dailyLoadProfiles.get(dateString) as DailyLoadProfile)
      : new DailyLoadProfile(new Date(dateString));
  }
}

export default LoadProfile;
