import { Injectable } from '@nestjs/common';
import * as XLSX from 'xlsx';
import { Logger } from 'nestjs-pino';

@Injectable()
export class ParseExcelService {
  constructor(private readonly logger: Logger) {}

  async parseExcel(buffer: Buffer): Promise<any[]> {
    try {
      const workbook = XLSX.read(buffer, { type: 'buffer' });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      return XLSX.utils.sheet_to_json(worksheet);
    } catch (error) {
      this.logger.error('Error parsing Excel file', error.stack);
      throw error;
    }
  }
}
