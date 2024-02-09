import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CatalogRepository } from './catalog.repository';
import { CreateItemDto } from './dto/create-item.dto';
import { ItemEntity } from './item.entity';
import { GuitarType, StringNumber } from 'src/shared/types/guitar.enum';
import { SortDirection, SortType } from 'src/shared/types/sort.enum';
import { UpdateItemDto } from './dto/update-item.dto';

@Injectable()
export class CatalogService {
  constructor(private readonly catalogRepository: CatalogRepository) {}

  public async create(dto: CreateItemDto, authorId: string) {
    const newItem = new ItemEntity({
      ...dto,
      createdAt: new Date(dto.createdAt),
      authorId,
    });
    const createdItem = await this.catalogRepository.create(newItem);

    if (!createdItem) {
      throw new ConflictException('Item with such vendor code already exists');
    }

    return ItemEntity.from(createdItem);
  }

  public async delete(vendorCode: string, authorId: string) {
    const item = await this.catalogRepository.delete(vendorCode, authorId);

    if (!item) {
      throw new ConflictException('Item with such vendor code does not exist');
    }

    return item;
  }

  public async findByVendorCode(vendorCode: string, authorId: string) {
    const item = await this.catalogRepository.findByVendorCode(
      vendorCode,
      authorId,
    );

    if (!item) {
      throw new ConflictException('Item with such vendor code does not exist');
    }

    return item;
  }

  public async findAll(
    page: number,
    limit: number,
    sortType: SortType,
    sortDirection: SortDirection,
    filterGuitar: string[],
    filterString: number[],
    authorId: string,
  ) {
    const result = await this.catalogRepository.findAll(
      page,
      limit,
      sortType,
      sortDirection,
      filterGuitar as GuitarType[],
      filterString as StringNumber[],
      authorId,
    );

    return result;
  }

  public async update(
    dto: UpdateItemDto,
    authorId: string,
    vendorCode: string,
  ) {
    const item = await this.catalogRepository.findByVendorCode(
      vendorCode,
      authorId,
    );

    if (!item) {
      throw new BadRequestException(
        'Item with such vendor code does not exist',
      );
    }

    if (dto.vendorCode) {
      const itemWithNewVendorCode =
        await this.catalogRepository.findByVendorCode(dto.vendorCode, authorId);

      if (itemWithNewVendorCode) {
        throw new BadRequestException(
          'Item with such vendor code already exists',
        );
      }
    }

    const updatedItemEntity = new ItemEntity({
      ...item,
      ...dto,
      createdAt: new Date(dto.createdAt),
      authorId,
    });

    const updatedItem = await this.catalogRepository.update(updatedItemEntity);

    return updatedItem;
  }
}
