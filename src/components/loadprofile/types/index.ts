export type CoincidentalPeak = {
  meteringPoint: string;
  kwdel: number;
  hour: number;
  date: Date;
};
export type NoneCoincidentalPeak = {
  kwdel: number;
};

export type DiversityFactor = {
  factor: number;
};

export type LoadProfileMax = {
  meteringPoint: string;
  kwdel: number;
  hour: number;
  date: Date;
};

export type LoadProfileSum = {
  meteringPoint: string;
  kwdel: number;
};
