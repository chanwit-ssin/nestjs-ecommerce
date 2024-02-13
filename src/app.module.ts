import { Module } from '@nestjs/common';
import { loadDbConfig } from './config/db.config';
import authConfig from './config/auth.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ProductModule } from './modules/product/product.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [authConfig, loadDbConfig],
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        configService.get<TypeOrmModuleOptions>('db'),
      inject: [ConfigService],
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
