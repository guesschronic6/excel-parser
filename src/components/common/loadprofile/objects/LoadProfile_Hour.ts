class LoadProfile_Hour {
  hour: number;
  kwdelSet: number[];

  constructor(hour: number) {
    this.hour = hour;
    this.kwdelSet = [];
  }

  addKwdel(kwdel: number): void {
    this.kwdelSet.push(kwdel);
  }

  getTotalKwdel(): number {
    const total = this.kwdelSet.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
    return total / this.kwdelSet.length;
  }
}

export default LoadProfile_Hour;
