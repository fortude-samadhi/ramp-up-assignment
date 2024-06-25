import { Test, TestingModule } from '@nestjs/testing';
import { ServiceRecordController } from './service-record.controller';

describe('ServiceRecordController', () => {
  let controller: ServiceRecordController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ServiceRecordController],
    }).compile();

    controller = module.get<ServiceRecordController>(ServiceRecordController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
