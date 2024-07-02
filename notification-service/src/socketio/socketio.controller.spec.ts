import { Test, TestingModule } from '@nestjs/testing';
import { SocketioController } from './socketio.controller';

describe('SocketioController', () => {
  let controller: SocketioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SocketioController],
    }).compile();

    controller = module.get<SocketioController>(SocketioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
