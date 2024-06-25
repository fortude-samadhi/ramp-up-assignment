import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecordService } from './service-record.service';

describe('ServiceRecordService', () => {
  let service: ServiceRecordService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ServiceRecordService],
    }).compile();

    service = module.get<ServiceRecordService>(ServiceRecordService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
