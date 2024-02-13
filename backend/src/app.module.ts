import { Module } from '@nestjs/common';
import { ConfigAppModule } from './shared/config/config-app.module';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { getMongoConnectionUri } from './shared/utils/common';
import { CatalogModule } from './catalog/catalog.module';
import { FileModule } from './file/file.module';

@Module({
  imports: [
    ConfigAppModule,
    UserModule,
    CatalogModule,
    FileModule,
    MongooseModule.forRootAsync({
      useFactory: async (config: ConfigService) => {
        return {
          uri: getMongoConnectionUri({
            password: config.get('app.db.password'),
            username: config.get('app.db.username'),
            host: config.get('app.db.host'),
            port: config.get('app.db.port'),
            dbName: config.get('app.db.name'),
            authSource: config.get('app.db.authSource'),
          }),
        };
      },
      inject: [ConfigService],
    }),
  ],
})
export class AppModule {}
