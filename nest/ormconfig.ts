import { DataSource } from 'typeorm'

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'ptg',
  password: 'ptg1234',
  database: 'nest',
  // entities: [__dirname + '/**/*.entity{.ts,.js}'],
  synchronize: false,
  // migrations: [__dirname + '/**/migrations/*.js'],
  migrationsTableName: 'migrations',
});