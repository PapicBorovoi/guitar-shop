import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { GuitarType } from 'src/shared/types/guitar.enum';

export class CreateItemDto {
  @ApiProperty({
    description: 'Name of the item',
    minLength: 10,
    maxLength: 100,
  })
  @IsString()
  @MinLength(10)
  @MaxLength(100)
  public name: string;

  @ApiProperty({
    description: 'Description of the item',
    minLength: 20,
    maxLength: 1024,
  })
  @IsString()
  @MinLength(20)
  @MaxLength(1024)
  public description: string;

  @ApiProperty({
    description: 'Price of the item',
    minimum: 100,
    maximum: 1000000,
  })
  @IsNumber()
  @Min(100)
  @Max(1000000)
  public price: number;

  @ApiProperty({
    description: 'Image URL of the item',
  })
  @IsString()
  public imageUrl: string;

  @ApiProperty({
    description: 'Date of creation of the item',
  })
  @IsDateString()
  public createdAt?: Date;

  @ApiProperty({
    description: 'Type of the guitar',
    enum: GuitarType,
  })
  @IsString()
  @IsEnum(GuitarType)
  public type: GuitarType;

  @ApiProperty({
    description: 'Vendor code of the item',
    minLength: 5,
    maxLength: 40,
  })
  @IsString()
  @MinLength(5)
  @MaxLength(40)
  public vendorCode: string;

  @ApiProperty({
    description: 'Number of strings of the guitar',
    enum: [4, 6, 7, 12],
  })
  @IsNumber()
  @IsEnum([4, 6, 7, 12])
  public numberOfStrings: number;
}
