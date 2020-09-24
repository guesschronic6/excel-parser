class MonthlyInterruptionItem {
  feeder: string;
  duration: number;

  constructor(feeder: string, duration: number) {
    this.feeder = feeder;
    this.duration = duration;
  }

  addDuration(duration: number) {
    this.duration += duration;
  }
}

export default MonthlyInterruptionItem;
