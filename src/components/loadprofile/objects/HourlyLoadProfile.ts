class HourlyLoadProfile {
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
    if (this.kwdelSet.length <= 0) return 0;
    const total = this.kwdelSet.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
    return total / this.kwdelSet.length;
  }

  getRawTotal(): number {
    if (this.kwdelSet.length <= 0) return 0;
    const total = this.kwdelSet.reduce((accumulator, currentValue) => {
      return accumulator + currentValue;
    });
    return total;
  }
}

export default HourlyLoadProfile;
