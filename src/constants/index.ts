export type PricePerItem = {
  trains: number;
  services: number;
};

export const pricePerItem: PricePerItem = {
  trains: 420,
  services: 42.69,
};

export enum OptionsType {
  TRAINS = 'trains',
  SERVICES = 'services',
}

export interface Item {
  name: string;
  imagePath: string;
}
