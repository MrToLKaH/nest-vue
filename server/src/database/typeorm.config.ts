import { DataSource } from 'typeorm';
import { config } from 'dotenv';

config({ path: './../.env' });

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['*/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
});

export default AppDataSource;
