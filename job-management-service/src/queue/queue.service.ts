import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('importQueue') private readonly importQueue: Queue) {}

  async addImportJob(data: any) {
    await this.importQueue.add(data);
  }
}
