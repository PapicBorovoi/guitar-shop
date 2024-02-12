import { GuitarType, StringsNumber } from './item.type';

export type Query = {
  page: number;
  limit: number;
  filterGuitar: GuitarType[];
  filterString: StringsNumber[];
  sortType: SortType;
  sortDirection: SortDirection;
};

export enum SortDirection {
  Asc = 'asc',
  Desc = 'desc',
}

export enum SortType {
  CreatedAt = 'createdAt',
  Price = 'price',
}
