class HourlyLoadProfile {
  hour: number;
  kwdelSet: { fileName: string; kwdel: number; kwhdel: number }[];

  constructor(hour: number) {
    this.hour = hour;
    this.kwdelSet = [];
  }

  addKwdel(kwdel: number, kwhdel: number, fileName: string): void {
    this.kwdelSet.push({ fileName, kwdel, kwhdel });
  }

  removeKwdel(fileName: string) {
    this.kwdelSet = this.kwdelSet.filter(
      (kwdel) => kwdel.fileName !== fileName
    );
  }

  getTotalKwhdel(): number {
    if (this.kwdelSet.length <= 0) return 0;
    let total = 0;
    for (let kwdel of this.kwdelSet) {
      total += kwdel.kwhdel;
    }
    return total / this.kwdelSet.length;
  }

  getRawTotalKwhdel(): number {
    if (this.kwdelSet.length <= 0) return 0;
    let total = 0;
    for (let kwdel of this.kwdelSet) {
      total += kwdel.kwhdel;
    }
    return total;
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
