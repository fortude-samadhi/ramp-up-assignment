// src/queue/queue.module.ts
import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { QueueService } from 'src/queue/queue.service';
import { QueueProcessor } from 'src/queue/queue.processor';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'importQueue',
    }),
  ],
  providers: [QueueService, QueueProcessor],
})
export class QueueModule {}
