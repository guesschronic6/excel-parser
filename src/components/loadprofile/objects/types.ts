export type LoadProfileMax = {
  meteringPoint: string;
  kwdel: number;
  hour: number;
  date: Date;
};

export type LoadProfileSum = {
  meteringPoint: string;
  kwdel: number;
  kwhdel: number;
};

export type LoadProfileSettings = {
  kwdelCol: number;
  kwhdelCol: number;
  dateCol: number;
  timeCol: number;
  dateFormat: string;
  timeFormat: string;
};

export type MonthlyLoadProfileData = {
  meteringPoint: string;
  kwdel: number;
  date: Date;
};
