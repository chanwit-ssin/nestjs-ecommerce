import { SequelizeModuleOptions } from '@nestjs/sequelize';

export const loadDbConfig: SequelizeModuleOptions = {
  dialect:  'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 5433,
  username: process.env.DB_USERNAME || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_DATABASE || 'user',
  autoLoadModels: true,
  synchronize: true,
};
