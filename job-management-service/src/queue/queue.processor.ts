// src/queue/queue.processor.ts
import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import { Injectable } from '@nestjs/common';

@Processor('importQueue')
export class QueueProcessor {
  @Process()
  async handleImport(job: Job) {
    const { data } = job;
    // Logic to process imported data
    console.log('Processing job', data);
  }
}
