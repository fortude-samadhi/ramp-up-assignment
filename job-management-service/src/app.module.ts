import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { TypeOrmModule } from '@nestjs/typeorm';
import { QueueModule } from 'src/queue/queue.module';
import { LoggerModule } from 'nestjs-pino';

import { Vehicle } from 'shared-service/dist/entities/vehicle.entity';
import { User } from 'shared-service/dist/entities/user.entity';
import { ServiceRecord } from 'shared-service/dist/entities/service-record.entity';
import { JobModule } from './job/job.module';
import { getConnectionOptions } from 'typeorm';


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
    QueueModule,
    JobModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
  ],
})
export class AppModule {}
