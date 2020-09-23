class Transformer {
  static readonly HYOSUNG_20MVA = new Transformer(
    "HYOSUNG_20MVA",
    "HYOSUNG PTX - 20MVA",
    "TP99-8513",
    20
  );
  static readonly SHIHLIN_20MVA = new Transformer(
    "SHIHLIN_20MVA",
    "SHIHLIN PTX - 20MVA",
    "810014",
    20
  );
  static readonly SHIHLIN_10MVVA = new Transformer(
    "SHIHLIN_10MVVA ",
    "SHIHLIN PTX - 10MVA",
    "T990113",
    10
  );
  static readonly SHIHLIN_5MVA = new Transformer(
    "SHIHLIN_5MVA",
    "SHIHLIN PTX - 5MVA",
    "",
    5
  );
  static readonly NANJING_20MVA = new Transformer(
    "NANJING_20MVA",
    "NANJING PTX - 20MVA",
    "610205",
    20
  );
  static readonly PRIME_MEIDEN_10MVA = new Transformer(
    "PRIME_MEIDEN_10MVA",
    "PRIME MEIDEN PTX - 10MVA",
    "",
    10
  );
  static readonly NEW_KOREA_10MVA = new Transformer(
    "NEW_KOREA_10MVA",
    "NEW KOREA PTX - 10MVA",
    "W910009",
    10
  );
  static readonly NEW_KOREA_5MVA = new Transformer(
    "NEW_KOREA_5MVA",
    "NEW KOREA PTX - 5MVA",
    "920194",
    5
  );
  static readonly CHANGZHOU_10MVA = new Transformer(
    "CHANGZHOU_10MVA",
    "CHANGZHOU PTX - 10MVA",
    "91-61-146",
    10
  );
  static readonly SHENDA_25MVA = new Transformer(
    "SHENDA_25MVA",
    "SHENDA PTX - 25MVA",
    "",
    25
  );

  key: string;
  text: string;
  serialNumber: string;
  power: number;

  private constructor(
    key: string,
    text: string,
    serialNumber: string,
    power: number
  ) {
    this.key = key;
    this.text = text;
    this.serialNumber = serialNumber;
    this.power = power;
  }

  toString() {
    return this.key;
  }
}

export default Transformer;
