import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateItemDto } from './dto/create-item.dto';
import { CatalogService } from './catalog.service';
import { fillDto } from 'src/shared/utils/common';
import { ItemRdo } from './rdo/item.rdo';
import { SortDirection, SortType } from 'src/shared/types/sort.enum';
import { DEFAULT_FETCH_LIMIT } from './catalog.const';
import { GetItemsQuery } from './query/get-items.query';
import { JWTAuthGuard } from 'src/shared/guards/jwt-auth.guard';
import { TokenPayload } from 'src/shared/types/token.interface';
import { UpdateItemDto } from './dto/update-item.dto';

interface ReqWithUser {
  user: TokenPayload;
}

@ApiTags('catalog')
@Controller('catalog')
export class CatalogController {
  constructor(private readonly catalogService: CatalogService) {}

  @ApiResponse({ status: HttpStatus.CREATED, description: 'Item created' })
  @UseGuards(JWTAuthGuard)
  @Post('create')
  public async create(
    @Body() dto: CreateItemDto,
    @Req() { user }: ReqWithUser,
  ) {
    const newItem = await this.catalogService.create(dto, user.id);
    return fillDto(ItemRdo, newItem);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Item deleted' })
  @UseGuards(JWTAuthGuard)
  @Delete(':vendorCode')
  public async delete(
    @Param('vendorCode') vendorCode: string,
    @Req() { user }: ReqWithUser,
  ) {
    await this.catalogService.delete(vendorCode, user.id);
    return { message: 'Item deleted' };
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'All items found' })
  @UseGuards(JWTAuthGuard)
  @Get('list')
  public async getAllItems(
    @Query()
    query: GetItemsQuery,
    @Req() { user }: ReqWithUser,
  ) {
    const { page, limit, filterGuitar, filterString, sortType, sortDirection } =
      query;
    const result = await this.catalogService.findAll(
      isNaN(+page!) ? 0 : +page,
      isNaN(+limit!) ? DEFAULT_FETCH_LIMIT : +limit,
      sortType ? sortType : SortType.CreatedAt,
      sortDirection ? sortDirection : SortDirection.Desc,
      filterGuitar ? filterGuitar : [],
      filterString ? filterString.map((num) => +num) : [],
      user.id,
    );
    return {
      items: result.items.map((item) => fillDto(ItemRdo, item)),
      total: result.total,
      page: isNaN(+page!) ? 0 : +page,
    };
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'Item found' })
  @UseGuards(JWTAuthGuard)
  @Get(':vendorCode')
  public async getItem(
    @Param('vendorCode') vendorCode: string,
    @Req() { user }: ReqWithUser,
  ) {
    const item = await this.catalogService.findByVendorCode(
      vendorCode,
      user.id,
    );
    return fillDto(ItemRdo, item);
  }

  @ApiResponse({ status: HttpStatus.OK, description: 'All items found' })
  @UseGuards(JWTAuthGuard)
  @Patch(':vendorCode')
  public async updateItem(
    @Param('vendorCode') vendorCode: string,
    @Body() dto: UpdateItemDto,
    @Req() { user }: ReqWithUser,
  ) {
    const updatedItem = await this.catalogService.update(
      dto,
      user.id,
      vendorCode,
    );
    return fillDto(ItemRdo, updatedItem);
  }
}
