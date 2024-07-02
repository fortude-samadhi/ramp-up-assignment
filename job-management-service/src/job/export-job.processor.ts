import { Process, Processor, OnQueueFailed } from '@nestjs/bull';
import { Job } from 'bull';
import { JobService } from './job.service';
// import { NotificationService } from './notification.service';
import { Logger } from 'nestjs-pino';

@Processor('export')
export class ExportJobProcessor {
  constructor(
    private readonly jobService: JobService,
    // private readonly notificationService: NotificationService,
    private readonly logger: Logger,
  ) {}

  @Process('export-vehicles')
  async handleExport(job: Job<{ data: any[], ageCriteria: number }>) {
    try {
      const csvData = await this.jobService.exportVehicles(job.data.ageCriteria);
      // Save csvData to a file or handle as needed

      // Notify notification service upon completion
    //   await this.notificationService.notify('Export completed successfully');
    } catch (error) {
      this.logger.error('Error handling export job', { error });
      throw error;
    }
  }

  @OnQueueFailed()
  handleFailedJob(job: Job<any>, error: any) {
    this.logger.error(`Job ${job.id} failed`, { error });
  }
}
