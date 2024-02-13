export type CreateItem = {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt: Date;
  type: GuitarType;
  vendorCode: string;
  numberOfStrings: StringsNumber;
};

export enum GuitarType {
  Acoustic = 'acoustic',
  Electric = 'electric',
  Ukulele = 'ukulele',
}

export enum StringsNumber {
  Four = 4,
  Six = 6,
  Seven = 7,
  Twelve = 12,
}

export type Item = {
  id: string;
} & CreateItem;
