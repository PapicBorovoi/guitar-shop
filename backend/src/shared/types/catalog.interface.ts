import { GuitarType } from './guitar.enum';

export interface Item {
  id?: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  createdAt?: Date;
  type: GuitarType;
  vendorCode: string;
  numberOfStrings: number;
  authorId?: string;
}
