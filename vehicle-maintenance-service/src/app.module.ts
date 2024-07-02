import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { BullModule } from '@nestjs/bull';
import { LoggerModule } from 'nestjs-pino';
import { VehicleModule } from './modules/vehicle/vehicle.module';
import { ServiceRecordModule } from './modules/service-record/service-record.module';

// import { User } from 'src/modules/user/entities/user.entity';
// import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';
// import { ServiceRecord } from 'src/modules/service-record/entities/service-record.entity';

import { Vehicle } from 'shared-service/dist/entities/vehicle.entity';
import { User } from 'shared-service/dist/entities/user.entity';
import { ServiceRecord } from 'shared-service/dist/entities/service-record.entity';

@Module({
  imports: [
    LoggerModule.forRoot({
      // pinoHttp: {
      //   prettyPrint: process.env.NODE_ENV !== 'production',
      // },
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'samadhi@fortude',
      database: 'vehicle_maintenance',
      entities: [User, Vehicle, ServiceRecord],
      synchronize: true,
    }),
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
      },
    }),
    UserModule, VehicleModule, ServiceRecordModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
