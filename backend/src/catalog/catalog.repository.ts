import { Injectable } from '@nestjs/common';
import { PrismaClientService } from 'src/prisma/prisma-client.service';
import { ItemEntity } from './item.entity';
import { GuitarType, StringNumber } from 'src/shared/types/guitar.enum';
import { SortDirection, SortType } from 'src/shared/types/sort.enum';
import { Prisma } from '@prisma/client';

@Injectable()
export class CatalogRepository {
  constructor(private readonly client: PrismaClientService) {}

  public async create(item: ItemEntity) {
    if (
      await this.client.guitar.findFirst({
        where: { vendorCode: item.vendorCode },
      })
    ) {
      return null;
    }

    const newItem = await this.client.guitar.create({
      data: {
        ...item,
        authorId: item.authorId,
      },
    });

    return ItemEntity.from({ ...newItem, type: newItem.type as GuitarType });
  }

  public async findByVendorCode(vendorCode: string, authorId: string) {
    const item = await this.client.guitar.findFirst({
      where: {
        AND: [{ vendorCode }, { authorId }],
      },
    });

    return item
      ? ItemEntity.from({ ...item, type: item.type as GuitarType })
      : null;
  }

  public async delete(vendorCode: string, authorId: string) {
    const item = await this.findByVendorCode(vendorCode, authorId);

    if (!item) {
      return null;
    }

    await this.client.guitar.delete({
      where: { id: item.id },
    });

    return ItemEntity.from(item);
  }

  public async findAll(
    page: number,
    limit: number,
    sortType: SortType,
    sortDirection: SortDirection,
    filterGuitar: GuitarType[],
    filterString: StringNumber[],
    authorId: string,
  ) {
    let where: Prisma.GuitarWhereInput = { authorId };
    if (filterGuitar.length && !filterString.length) {
      where = { AND: [{ type: { in: filterGuitar } }, { authorId }] };
    } else if (!filterGuitar.length && filterString.length) {
      where = {
        AND: [{ numberOfStrings: { in: filterString } }, { authorId }],
      };
    } else if (filterGuitar.length && filterString.length) {
      where = {
        AND: [
          { type: { in: filterGuitar } },
          { numberOfStrings: { in: filterString } },
          { authorId },
        ],
      };
    }

    const items = await this.client.guitar.findMany({
      take: limit,
      skip: page * limit,
      where,
      orderBy: {
        [sortType]: sortDirection,
      },
    });

    const total = await this.client.guitar.count({
      where,
    });

    return {
      items: items.map((item) =>
        ItemEntity.from({ ...item, type: item.type as GuitarType }),
      ),
      total,
    };
  }

  public async update(updatedItem: ItemEntity) {
    const updated = await this.client.guitar.update({
      where: { id: updatedItem.id },
      data: {
        ...updatedItem,
      },
    });

    return ItemEntity.from({ ...updated, type: updated.type as GuitarType });
  }
}
