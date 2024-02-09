import { Item } from 'src/shared/types/catalog.interface';
import { GuitarType } from 'src/shared/types/guitar.enum';

export class ItemEntity implements Item {
  public id?: string;
  public name: string;
  public description: string;
  public price: number;
  public imageUrl: string;
  public createdAt?: Date;
  public type: GuitarType;
  public vendorCode: string;
  public numberOfStrings: number;
  public authorId?: string;

  constructor(item: Item) {
    this.id = item.id;
    this.name = item.name;
    this.description = item.description;
    this.price = item.price;
    this.imageUrl = item.imageUrl;
    this.createdAt = item.createdAt;
    this.type = item.type;
    this.vendorCode = item.vendorCode;
    this.numberOfStrings = item.numberOfStrings;
    this.authorId = item.authorId;
  }

  public toPojo(): Item {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      price: this.price,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      type: this.type,
      vendorCode: this.vendorCode,
      numberOfStrings: this.numberOfStrings,
      authorId: this.authorId,
    };
  }

  public static from(item: Item): ItemEntity {
    return new ItemEntity(item);
  }
}
