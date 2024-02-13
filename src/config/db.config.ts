import { join } from 'path';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import 'dotenv/config';
import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const dbConfig = () => {
  // You can load you .env file here synchronously using dotenv package (not installed here),
  // You can also make a singleton service that load and expose the .env file content.
  // ...
  // Check typeORM documentation for more information.
  const options: DataSourceOptions = {
    name: 'default',
    type: 'postgres',
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [join(__dirname, '../') + '/**/*.entity{.ts,.js}'],

    // We are using migrations, synchronize should be set to false.
    synchronize: (process.env.DB_SYNCHRONIZE || 'false') === 'true',

    // Run migrations automatically,
    // you can disable this if you prefer running migration manually.
    migrationsRun: (process.env.DB_MIGRATIONS_RUN || 'false') === 'true',
    logging: false, // logger: 'file',
    dropSchema: (process.env.DB_DROP_SCHEMA || 'false') === 'true',

    // allow both start:prod and start:dev to use migrations
    // __dirname is either dist or src folder, meaning either
    // the compiled js in prod or the ts in dev
    migrations: [join(__dirname, '../') + '/migrations/**/*{.ts,.js}'],
    // cli: {
    //   migrationsDir: 'src/migration',
    // },
    namingStrategy: new SnakeNamingStrategy(),
  };
  return options;
};

export const loadConfig = (): DataSourceOptions => dbConfig();
export const dataSource = new DataSource(dbConfig());
const config = loadConfig();
export default config;

export const loadDbConfig = registerAs('db', (): TypeOrmModuleOptions => {
  return dbConfig();
});
