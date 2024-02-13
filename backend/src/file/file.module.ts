import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'node:path';
import { FileController } from './file.controller';
import { FileService } from './file.service';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join('static'),
    }),
  ],
  providers: [FileService],
  controllers: [FileController],
})
export class FileModule {}
