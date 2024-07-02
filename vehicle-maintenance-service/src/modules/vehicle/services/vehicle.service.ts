import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';
import { Logger } from 'nestjs-pino';
import { PaginationDto, UserVehicleResponseDto } from '../dtos/pagination.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'shared-service/dist/entities/user.entity';
import { Repository } from 'typeorm';
import { SearchDto } from '../dtos/search.dto';

@Injectable()
export class VehicleService {
  constructor(
    @InjectQueue('import') private importQueue: Queue,
    @InjectQueue('export') private exportQueue: Queue,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly logger: Logger,
  ) {}

  async uploadFile(file:  Express.Multer.File, fileExtension: string) {
    try {
      await this.importQueue.add('import-vehicles', { file: file.buffer.toString(), fileExtension });
    } catch (error) {
      this.logger.error('Error adding job to queue', error.stack);
      throw error;
    }
  }

  async exportFile(data:any[]  , ageCriteria: number) {
    try {
      await this.exportQueue.add('export-vehicles', { data, ageCriteria });
    } catch (error) {
      this.logger.error('Error adding job to queue', error.stack);
      throw error;
    }
  }
  
  async paginate(paginationDto: PaginationDto): Promise<{ data: UserVehicleResponseDto[], count: number }> {
    const { page, size, sortField, sortOrder } = paginationDto;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.vehicles', 'vehicle')
      .skip((page - 1) * size)
      .take(size);

    if (sortField && sortOrder) {
        queryBuilder.orderBy(sortField, sortOrder);
    }

    const [users, count] = await queryBuilder.getManyAndCount();

    const data = users.map(user => {
      return user.vehicles.map(vehicle => ({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        vehicle_id: vehicle.vehicle_id,
        car_make: vehicle.car_make,
        car_model: vehicle.car_model,
        vin: vehicle.vin,
        manufactured_date: vehicle.manufactured_date,
        age_of_vehicle: vehicle.age_of_vehicle,
      }));
    }).flat();

    return { data, count };
  }

  async search(searchDto: SearchDto, paginationDto: PaginationDto): Promise<{ data: UserVehicleResponseDto[], count: number }> {
    const { carModel } = searchDto;
    const { page, size, sortField, sortOrder } = paginationDto;

    const queryBuilder = this.userRepository.createQueryBuilder('user')
      .leftJoinAndSelect('user.vehicles', 'vehicle')
      .where('vehicle.car_model LIKE :carModel', { carModel: `%${carModel}%` })
      .skip((page - 1) * size)
      .take(size);

    // Sorting logic
    if (sortField === 'manufactured_date') {
      queryBuilder.orderBy('vehicle.manufactured_date', sortOrder);
    } else if (sortField) {
      queryBuilder.orderBy(`user.${sortField}`, sortOrder);
    }

    const [users, count] = await queryBuilder.getManyAndCount();

    const data = users.map(user => {
      return user.vehicles.map(vehicle => ({
        user_id: user.user_id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        vehicle_id: vehicle.vehicle_id,
        car_make: vehicle.car_make,
        car_model: vehicle.car_model,
        vin: vehicle.vin,
        manufactured_date: vehicle.manufactured_date,
        age_of_vehicle: vehicle.age_of_vehicle,
      }));
    }).flat();

    return { data, count };
  }
}
