import Feeder from "../common/enums/Feeder";

class MonthlyInterruptionItem {
  feeder: Feeder;
  duration: number;

  constructor(feeder: Feeder, duration: number) {
    this.feeder = feeder;
    this.duration = duration;
  }

  addDuration(duration: number) {
    this.duration += duration;
  }
}

export default MonthlyInterruptionItem;
