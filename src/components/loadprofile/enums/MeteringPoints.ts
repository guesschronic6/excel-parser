import Feeder from "./Feeder";
import Substation from "./Substation";
import Transformer from "./Transformer";

class MeteringPoint {
  static readonly MF3MPITZAMC01 = new MeteringPoint("MF3MPITZAMC01", [
    Substation.PUTIK,
  ]);

  static readonly MF3MPITZAMC02 = new MeteringPoint("MF3MPITZAMC02", [
    Substation.SANJOSE_GUSU,
  ]);

  static readonly MF3MPITZAMC03 = new MeteringPoint("MF3MPITZAMC03", [
    Substation.SANGALI,
  ]);
  static readonly MF3MPITZAMC04 = new MeteringPoint("MF3MPITZAMC04", [
    Substation.RECODO,
    Substation.AYALA,
  ]);
  static readonly MF3MPITZAMC05 = new MeteringPoint("MF3MPITZAMC05", [
    Substation.CABATANGAN,
  ]);
  static readonly MF3MPITZAMC06 = new MeteringPoint("MF3MPITZAMC06", []);
  static readonly MF3MPITZAMC07 = new MeteringPoint("MF3MPITZAMC07", [
    Substation.CAMANCHILI,
  ]);

  key: string;
  substations: Substation[];

  private constructor(key: string, substations: Substation[]) {
    this.key = key;
    this.substations = substations;
  }

  toString() {
    return this.key;
  }

  getFeeders() {
    let feeders: Feeder[] = [];
    for (let substation of this.substations) {
      for (let substationItem of substation.substationItems) {
        feeders = [...feeders, ...substationItem.feeders];
      }
    }
    return feeders;
  }

  static getMeteringPoint(meteringPoint: string): MeteringPoint | null {
    switch (meteringPoint.toUpperCase()) {
      case this.MF3MPITZAMC01.key:
        return this.MF3MPITZAMC01;
      case this.MF3MPITZAMC02.key:
        return this.MF3MPITZAMC02;
      case this.MF3MPITZAMC03.key:
        return this.MF3MPITZAMC03;
      case this.MF3MPITZAMC04.key:
        return this.MF3MPITZAMC04;
      case this.MF3MPITZAMC05.key:
        return this.MF3MPITZAMC05;
      case this.MF3MPITZAMC06.key:
        return this.MF3MPITZAMC06;
      case this.MF3MPITZAMC07.key:
        return this.MF3MPITZAMC07;
      default:
        return null;
    }
  }

  static exists(meteringPoint: string): boolean {
    switch (meteringPoint) {
      case this.MF3MPITZAMC01.key:
      case this.MF3MPITZAMC02.key:
      case this.MF3MPITZAMC03.key:
      case this.MF3MPITZAMC04.key:
      case this.MF3MPITZAMC05.key:
      case this.MF3MPITZAMC06.key:
      case this.MF3MPITZAMC07.key:
        return true;
      default:
        return false;
    }
  }
}

export default MeteringPoint;
