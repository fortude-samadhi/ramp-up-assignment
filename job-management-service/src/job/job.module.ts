import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { ParseCsvService } from './parse-csv.service';
import { ParseExcelService } from './parse-excel.service';
import { VehicleRepository } from './vehicle.repository';
import { ImportJobProcessor } from './import-job.processor';
import { ExportJobProcessor } from './export-job.processor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'shared-service/dist/entities/vehicle.entity';
import { BullModule } from '@nestjs/bull';
import { User } from 'shared-service/dist/entities/user.entity';
import { NotificationService } from './notification.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle, User]),
    BullModule.registerQueue(
      { name: 'import'},
      { name: 'export'},
    )
  ],
  controllers: [],
  providers: [
    JobService,
    VehicleRepository,
    ParseCsvService,
    ParseExcelService,
    ImportJobProcessor,
    ExportJobProcessor,
    NotificationService
],
})
export class JobModule {}
