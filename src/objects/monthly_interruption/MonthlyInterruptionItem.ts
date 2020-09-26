import Feeder from "../common/enums/Feeder";

class MonthlyInterruptionItem {
  feeder: Feeder;
  durations: { fileName: string; value: number }[];

  constructor(feeder: Feeder) {
    this.feeder = feeder;
    this.durations = [];
  }

  addDuration(duration: number, fileName: string) {
    this.durations.push({ fileName, value: duration });
  }

  getTotalDuration() {
    let total = 0;
    for (let duration of this.durations) {
      total += duration.value;
    }
    return total;
  }

  removeFile(fileName: string) {
    this.durations = this.durations.filter(
      (duration) => duration.fileName !== fileName
    );
  }
}

export default MonthlyInterruptionItem;
