import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const ormConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'password',
  database: 'vehicle_maintenance',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};
