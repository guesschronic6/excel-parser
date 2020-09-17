class LoadProfile_Hour {
  hour: number;
  kwdelSet: number[];

  constructor(hour: number) {
    this.hour = hour;
    this.kwdelSet = [];
  }

  addKwdel(kwdel: number): void {
    console.log(`Adding ${kwdel} to hour ${this.hour}`);
    this.kwdelSet.push(kwdel);
  }

  getTotalKwdel(): number {
    if (this.kwdelSet.length <= 0) return 0;
    const total = this.kwdelSet.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
    return total / this.kwdelSet.length;
  }
}

export default LoadProfile_Hour;
