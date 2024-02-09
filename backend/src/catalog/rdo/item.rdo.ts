import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { GuitarType } from 'src/shared/types/guitar.enum';

export class ItemRdo {
  @ApiProperty({
    type: String,
    description: 'Item id',
  })
  @Expose()
  public id?: string;

  @ApiProperty({
    type: String,
    description: 'Item name',
  })
  @Expose()
  public name: string;

  @ApiProperty({
    type: String,
    description: 'Item description',
  })
  @Expose()
  public description: string;

  @ApiProperty({
    type: Number,
    description: 'Item price',
  })
  @Expose()
  public price: number;

  @ApiProperty({
    type: String,
    description: 'Item image url',
  })
  @Expose()
  public imageUrl: string;

  @ApiProperty({
    type: Date,
    description: 'Item creation date',
  })
  @Expose()
  public createdAt?: Date;

  @ApiProperty({
    type: String,
    description: 'Item type',
  })
  @Expose()
  public type: GuitarType;

  @ApiProperty({
    type: String,
    description: 'Item vendor code',
  })
  @Expose()
  public vendorCode: string;

  @ApiProperty({
    type: Number,
    description: 'Number of strings',
  })
  @Expose()
  public numberOfStrings: number;
}
