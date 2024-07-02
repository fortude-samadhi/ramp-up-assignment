import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, Get, Query, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { VehicleService } from 'src/modules/vehicle/services/vehicle.service';
import { Logger } from 'nestjs-pino';
import { PaginationDto, UserVehicleResponseDto } from '../dtos/pagination.dto';
import { SearchDto } from '../dtos/search.dto';

@Controller('vehicles')
export class VehicleController {
  constructor(
    private readonly vehicleService: VehicleService,
    private readonly logger: Logger,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    try {
      if (!file) {
        throw new BadRequestException('No file uploaded');
      }

      const fileExtension = file.originalname.split('.').pop().toLowerCase();
      if (!['csv', 'xlsx'].includes(fileExtension)) {
        throw new BadRequestException('Invalid file format. Only CSV and Excel files are supported.');
      }

      await this.vehicleService.uploadFile(file, fileExtension);
      return { message: 'File uploaded and processing started' };
    } catch (error) {
      this.logger.error('Error uploading file', error.stack);
      throw error;
    }
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto): Promise<{ data: UserVehicleResponseDto[], count: number }> {
    return this.vehicleService.paginate(paginationDto);
  }

  @Get('search')
  async search(
    @Query() searchDto: SearchDto,
    @Query() paginationDto: PaginationDto
  ): Promise<{ data: UserVehicleResponseDto[], count: number }> {
    return this.vehicleService.search(searchDto, paginationDto);
  }

  @Post('export')
  async queueDataForProcessing(@Body() payload: { data: any[], ageCriteria: number }) {
    try {
      const { data, ageCriteria } = payload;
      await this.vehicleService.exportFile(data, ageCriteria);
      this.logger.log('Data queued for processing');
      return { message: 'export job added and processing started' };
    } catch (error) {
      this.logger.error('Error queuing data for processing', error.stack);
      throw error;
    }
  }


}
