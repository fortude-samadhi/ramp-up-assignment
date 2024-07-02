import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import { Logger } from 'nestjs-pino';
import { PassThrough } from 'stream';

@Injectable()
export class ParseCsvService {
  constructor(private readonly logger: Logger) {}

  async parseCsv(buffer: Buffer): Promise<any[]> {
    const results = [];
    const parseStream = csv();
    const readStream = new PassThrough();
    readStream.end(buffer);

    return new Promise((resolve, reject) => {
      readStream
        .pipe(parseStream)
        .on('data', (data) => results.push(data))
        .on('end', () => resolve(results))
        .on('error', (error) => {
          this.logger.error('Error parsing CSV', error.stack);
          reject(error);
        });
    });
  }
}


// import { Injectable } from '@nestjs/common';
// import * as csv from 'csv-parser';
// import { Readable } from 'stream';

// @Injectable()
// export class ParseCsvService {
//   async parseCsv(fileBuffer: Buffer): Promise<any[]> {
//     const results = [];
    
//     // Verify the fileBuffer is indeed a Buffer
//     if (!Buffer.isBuffer(fileBuffer)) {
//       throw new TypeError('Expected fileBuffer to be a Buffer');
//     }

//     // Create a readable stream from the buffer
//     const stream = Readable.from(fileBuffer.toString());

//     return new Promise((resolve, reject) => {
//       stream.pipe(csv())
//         .on('data', (data) => results.push(data))
//         .on('end', () => resolve(results))
//         .on('error', (error) => reject(error));
//     });
//   }
// }

