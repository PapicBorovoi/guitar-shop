import { IsArray, IsEnum, IsNumberString, IsOptional } from 'class-validator';
import { GuitarType } from 'src/shared/types/guitar.enum';
import { SortDirection, SortType } from 'src/shared/types/sort.enum';

export class GetItemsQuery {
  @IsNumberString()
  public page?: number;

  @IsNumberString()
  public limit?: number;

  @IsEnum(GuitarType, { each: true })
  @IsArray()
  @IsOptional()
  public filterGuitar?: string[];

  @IsNumberString({}, { each: true })
  @IsArray()
  @IsOptional()
  public filterString?: number[];

  @IsEnum(SortType)
  public sortType: SortType;

  @IsEnum(SortDirection)
  public sortDirection: SortDirection;
}
