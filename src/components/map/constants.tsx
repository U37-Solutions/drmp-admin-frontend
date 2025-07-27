import { Region, type RegionInfo } from './types';

export const UKRAINE_BOUNDS = {
  north: 52.38,
  south: 44.38,
  west: 22.09,
  east: 40.23,
};

export const REGION_TITLE: Record<Region, string> = {
  [Region.CRIMEA]: 'Автономна Республіка Крим',
  [Region.VINNYTSKA]: 'Вінницький',
  [Region.VOLYNSKA]: 'Волинський',
  [Region.DNIPROPETROVSKA]: 'Дніпропетровський',
  [Region.DONETSKA]: 'Донецький',
  [Region.ZHYTOMYRSKA]: 'Житомирський',
  [Region.ZAKARPATSKA]: 'Закарпатський',
  [Region.ZAPORIZKA]: 'Запорізький',
  [Region.IVANO_FRANKIVSKA]: 'Івано-Франківський',
  [Region.KYIVSKA]: 'Київський',
  [Region.KIROVOHRADSKA]: 'Кіровоградський',
  [Region.LUHANSKA]: 'Луганський',
  [Region.LVIVSKA]: 'Львівський',
  [Region.MYKOLAIVSKA]: 'Миколаївський',
  [Region.ODESKA]: 'Одеський',
  [Region.POLTAVSKA]: 'Полтавський',
  [Region.RIVNENSKA]: 'Рівненський',
  [Region.SUMSKA]: 'Сумський',
  [Region.TERNOPILSKA]: 'Тернопільський',
  [Region.KHARKIVSKA]: 'Харківський',
  [Region.KHERSONSKA]: 'Херсонський',
  [Region.KHMELNYTSKA]: 'Хмельницький',
  [Region.CHERKASKA]: 'Черкаський',
  [Region.CHERNIVETSKA]: 'Чернівецький',
  [Region.CHERNIHIVSKA]: 'Чернігівський',
};

export const REGION_INFO: Record<Region, RegionInfo> = {
  [Region.CRIMEA]: {
    title: REGION_TITLE[Region.CRIMEA],
    bounds: { north: 45.3, south: 44.3, west: 32.0, east: 36.6 },
  },
  [Region.VINNYTSKA]: {
    title: REGION_TITLE[Region.VINNYTSKA],
    bounds: { north: 49.55, south: 48.1, west: 27.3, east: 29.7 },
  },
  [Region.VOLYNSKA]: {
    title: REGION_TITLE[Region.VOLYNSKA],
    bounds: { north: 51.25, south: 50.0, west: 23.5, east: 26.0 },
  },
  [Region.DNIPROPETROVSKA]: {
    title: REGION_TITLE[Region.DNIPROPETROVSKA],
    bounds: { north: 49.0, south: 47.0, west: 33.0, east: 36.2 },
  },
  [Region.DONETSKA]: {
    title: REGION_TITLE[Region.DONETSKA],
    bounds: { north: 49.9, south: 47.7, west: 37.2, east: 39.8 },
  },
  [Region.ZHYTOMYRSKA]: {
    title: REGION_TITLE[Region.ZHYTOMYRSKA],
    bounds: { north: 51.6, south: 49.8, west: 27.2, east: 29.6 },
  },
  [Region.ZAKARPATSKA]: {
    title: REGION_TITLE[Region.ZAKARPATSKA],
    bounds: { north: 49.3, south: 47.5, west: 22.1, east: 24.4 },
  },
  [Region.ZAPORIZKA]: {
    title: REGION_TITLE[Region.ZAPORIZKA],
    bounds: { north: 48.8, south: 46.9, west: 35.0, east: 37.8 },
  },
  [Region.IVANO_FRANKIVSKA]: {
    title: REGION_TITLE[Region.IVANO_FRANKIVSKA],
    bounds: { north: 49.2, south: 47.3, west: 23.8, east: 25.8 },
  },
  [Region.KYIVSKA]: {
    title: REGION_TITLE[Region.KYIVSKA],
    bounds: { north: 51.7, south: 49.9, west: 29.9, east: 32.2 },
  },
  [Region.KIROVOHRADSKA]: {
    title: REGION_TITLE[Region.KIROVOHRADSKA],
    bounds: { north: 50.5, south: 48.8, west: 31.0, east: 33.1 },
  },
  [Region.LUHANSKA]: {
    title: REGION_TITLE[Region.LUHANSKA],
    bounds: { north: 49.5, south: 47.3, west: 38.0, east: 40.5 },
  },
  [Region.LVIVSKA]: {
    title: REGION_TITLE[Region.LVIVSKA],
    bounds: { north: 50.7, south: 49.0, west: 23.5, east: 25.8 },
  },
  [Region.MYKOLAIVSKA]: {
    title: REGION_TITLE[Region.MYKOLAIVSKA],
    bounds: { north: 48.3, south: 46.4, west: 30.8, east: 33.0 },
  },
  [Region.ODESKA]: {
    title: REGION_TITLE[Region.ODESKA],
    bounds: { north: 48.2, south: 45.2, west: 29.3, east: 31.9 },
  },
  [Region.POLTAVSKA]: {
    title: REGION_TITLE[Region.POLTAVSKA],
    bounds: { north: 50.5, south: 49.0, west: 32.2, east: 35.0 },
  },
  [Region.RIVNENSKA]: {
    title: REGION_TITLE[Region.RIVNENSKA],
    bounds: { north: 51.4, south: 50.1, west: 25.5, east: 27.8 },
  },
  [Region.SUMSKA]: {
    title: REGION_TITLE[Region.SUMSKA],
    bounds: { north: 52.2, south: 50.5, west: 33.5, east: 35.8 },
  },
  [Region.TERNOPILSKA]: {
    title: REGION_TITLE[Region.TERNOPILSKA],
    bounds: { north: 49.8, south: 48.2, west: 24.8, east: 26.5 },
  },
  [Region.KHARKIVSKA]: {
    title: REGION_TITLE[Region.KHARKIVSKA],
    bounds: { north: 50.5, south: 48.3, west: 35.0, east: 37.7 },
  },
  [Region.KHERSONSKA]: {
    title: REGION_TITLE[Region.KHERSONSKA],
    bounds: { north: 47.8, south: 45.8, west: 32.8, east: 35.5 },
  },
  [Region.KHMELNYTSKA]: {
    title: REGION_TITLE[Region.KHMELNYTSKA],
    bounds: { north: 50.6, south: 48.8, west: 26.1, east: 27.9 },
  },
  [Region.CHERKASKA]: {
    title: REGION_TITLE[Region.CHERKASKA],
    bounds: { north: 50.1, south: 48.3, west: 31.4, east: 33.5 },
  },
  [Region.CHERNIVETSKA]: {
    title: REGION_TITLE[Region.CHERNIVETSKA],
    bounds: { north: 48.5, south: 47.9, west: 25.0, east: 26.6 },
  },
  [Region.CHERNIHIVSKA]: {
    title: REGION_TITLE[Region.CHERNIHIVSKA],
    bounds: { north: 52.1, south: 51.0, west: 31.3, east: 33.6 },
  },
};
