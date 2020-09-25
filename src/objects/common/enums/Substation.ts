import Feeder from "./Feeder";
import Transformer from "./Transformer";

class SubstationItem {
  transformer: Transformer;
  feeders: Set<Feeder>;

  constructor(transformer: Transformer, feeders: Set<Feeder>) {
    this.transformer = transformer;
    this.feeders = feeders;
  }

  toString() {
    return this.transformer.key;
  }

  isFeederExist(feeder: Feeder) {
    return this.feeders.has(feeder);
  }
}

class Substation {
  static readonly PUTIK = new Substation("PUTIK", "PUTIK S/S", [
    new SubstationItem(
      Transformer.SHIHLIN_20MVA,
      new Set([Feeder.GUIWAN, Feeder.TUMAGA, Feeder.ARENA_BLANCO, Feeder.PRESA])
    ),
    new SubstationItem(
      Transformer.HYOSUNG_20MVA,
      new Set([Feeder.TETUAN, Feeder.MERCEDES, Feeder.NORTHSIDE, Feeder.ZAMPEN])
    ),
  ]);
  static readonly SANJOSE_GUSU = new Substation(
    "SAN JOSE GUSU",
    "SAN JOSE GUSU S/S",
    [
      new SubstationItem(
        Transformer.NANJING_20MVA,
        new Set([
          Feeder.SAN_JOSE,
          Feeder.CALARIAN,
          Feeder.BALIWASAN,
          Feeder.DEDICATED_LINE,
        ])
      ),
      new SubstationItem(Transformer.NEW_KOREA_10MVA, new Set()),
    ]
  );
  static readonly SANGALI = new Substation("SANGALI", "SANGALI S/S", [
    new SubstationItem(
      Transformer.PRIME_MEIDEN_10MVA,
      new Set([Feeder.CULIANAN, Feeder.CURUAN, Feeder.FISHING_PORT])
    ),
  ]);
  static readonly AYALA = new Substation("AYALA", "AYALA S/S", [
    new SubstationItem(
      Transformer.SHIHLIN_10MVVA,
      new Set([Feeder.TALISAYAN, Feeder.LABUAN])
    ),
  ]);

  static readonly RECODO = new Substation("RECODO", "RECODO S/S", [
    new SubstationItem(Transformer.NEW_KOREA_10MVA, new Set([Feeder.RECODO])),
    new SubstationItem(Transformer.NEW_KOREA_5MVA, new Set([Feeder.SINUNUC])),
    new SubstationItem(Transformer.SHIHLIN_5MVA, new Set([])),
  ]);
  static readonly CABATANGAN = new Substation("CABATANGAN", "CABATANGAN S/S", [
    new SubstationItem(
      Transformer.CHANGZHOU_10MVA,
      new Set([Feeder.PASONANCA])
    ),
    new SubstationItem(
      Transformer.PRIME_MEIDEN_10MVA,
      new Set([Feeder.SAN_ROQUE])
    ),
  ]);
  static readonly CAMANCHILI = new Substation("CAMANCHILI", "CAMANCHILI S/S", [
    new SubstationItem(
      Transformer.SHIHLIN_20MVA,
      new Set([
        Feeder.ACLEM,
        Feeder.GOVERNOR_ALVAREZ,
        Feeder.VETERANS_AVENUE,
        Feeder.NUNEZ,
      ])
    ),
    new SubstationItem(
      Transformer.SHENDA_25MVA,
      new Set([
        Feeder.STA_CATALINA,
        Feeder.RIO_HONDO,
        Feeder.GUARDIA_NACIONAL,
        Feeder.CAMPANER,
      ])
    ),
  ]);

  static readonly ALL = [
    Substation.PUTIK,
    Substation.RECODO,
    Substation.SANGALI,
    Substation.SANJOSE_GUSU,
    Substation.AYALA,
    Substation.CABATANGAN,
    Substation.CAMANCHILI,
  ];

  key: string;
  text: string;
  substationItems: SubstationItem[];

  private constructor(
    key: string,
    text: string,
    substationItems: SubstationItem[]
  ) {
    this.key = key;
    this.text = text;
    this.substationItems = substationItems;
  }

  toStrting() {
    return this.key;
  }
}

export default Substation;
export { SubstationItem };
