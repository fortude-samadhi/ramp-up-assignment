import { Module } from '@nestjs/common';
import { ServiceRecordController } from './controllers/service-record.controller';
import { ServiceRecordService } from './services/service-record.service';

@Module({
  controllers: [ServiceRecordController],
  providers: [ServiceRecordService]
})
export class ServiceRecordModule {}
