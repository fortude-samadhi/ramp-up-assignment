import { Process, Processor, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { JobService } from './job.service';
import { Logger } from 'nestjs-pino';

@Processor('import')
export class ImportJobProcessor {
  constructor(
    private readonly jobService: JobService,
    private readonly logger: Logger,
  ) {}

  @Process('import-vehicles')
  async handleImport(job: Job<{ file: Buffer; fileExtension: string }>) {
    try {
      await this.jobService.processFile(job.data.file, job.data.fileExtension);
    } catch (error) {
      this.logger.error('Error handling import job', error.stack);
      throw error;
    }
  }

  @OnQueueFailed()
  handleFailedJob(job: Job<any>, error: any) {
    this.logger.error(`Job ${job.id} failed`, error.stack);
  }
}
