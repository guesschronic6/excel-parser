export default class CoincidentPeak {
  meteringPoint: string;
  kwdel: number;
  hour: number;
  date: Date;

  constructor() {
    this.meteringPoint = "";
    this.kwdel = 0;
    this.hour = 0;
    this.date = new Date();
  }
}
