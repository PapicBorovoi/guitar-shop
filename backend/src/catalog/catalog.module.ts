import { Module } from '@nestjs/common';
import { CatalogController } from './catalog.controller';
import { CatalogRepository } from './catalog.repository';
import { CatalogService } from './catalog.service';
import { PrismaClientModule } from 'src/prisma/prisma-client.module';

@Module({
  imports: [PrismaClientModule],
  controllers: [CatalogController],
  providers: [CatalogRepository, CatalogService],
  exports: [],
})
export class CatalogModule {}
