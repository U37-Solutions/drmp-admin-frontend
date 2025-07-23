export type LocationOption = {
  value: string;
  key: string;
};

export type LocationGeometry = {
  lat: number;
  lng: number;
};

export type Bounds = {
  north: number;
  south: number;
  east: number;
  west: number;
};

export type RegionInfo = {
  title: string;
  bounds: Bounds;
};

export enum Region {
  CRIMEA = 1,
  VINNYTSKA = 2,
  VOLYNSKA = 3,
  DNIPROPETROVSKA = 4,
  DONETSKA = 5,
  ZHYTOMYRSKA = 6,
  ZAKARPATSKA = 7,
  ZAPORIZKA = 8,
  IVANO_FRANKIVSKA = 9,
  KYIVSKA = 10,
  KIROVOHRADSKA = 11,
  LUHANSKA = 12,
  LVIVSKA = 13,
  MYKOLAIVSKA = 14,
  ODESKA = 15,
  POLTAVSKA = 16,
  RIVNENSKA = 17,
  SUMSKA = 18,
  TERNOPILSKA = 19,
  KHARKIVSKA = 20,
  KHERSONSKA = 21,
  KHMELNYTSKA = 22,
  CHERKASKA = 23,
  CHERNIVETSKA = 24,
  CHERNIHIVSKA = 25,
}
