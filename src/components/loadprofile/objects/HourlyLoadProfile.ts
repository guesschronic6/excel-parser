class HourlyLoadProfile {
  hour: number;
  kwdelSet: { fileName: string; kwdel: number }[];

  constructor(hour: number) {
    this.hour = hour;
    this.kwdelSet = [];
  }

  addKwdel(kwdel: number, fileName: string): void {
    this.kwdelSet.push({ fileName, kwdel });
  }

  removeKwdel(fileName: string) {
    this.kwdelSet = this.kwdelSet.filter(
      (kwdel) => kwdel.fileName !== fileName
    );
  }

  getTotalKwdel(): number {
    if (this.kwdelSet.length <= 0) return 0;
    let total = 0;
    for (let kwdel of this.kwdelSet) {
      total += kwdel.kwdel;
    }
    return total / this.kwdelSet.length;
  }

  getRawTotal(): number {
    if (this.kwdelSet.length <= 0) return 0;
    let total = 0;
    for (let kwdel of this.kwdelSet) {
      total += kwdel.kwdel;
    }
    return total;
  }
}

export default HourlyLoadProfile;
