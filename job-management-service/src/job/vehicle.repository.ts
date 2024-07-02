import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vehicle } from 'shared-service/dist/entities/vehicle.entity';
import { Logger } from 'nestjs-pino';

@Injectable()
export class VehicleRepository {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
    private readonly logger: Logger,
  ) {}

  async create(vehicle: Partial<Vehicle>): Promise<Vehicle> {
    try {
      const newVehicle = this.vehicleRepository.create(vehicle);
      return this.vehicleRepository.save(newVehicle);
    } catch (error) {
      this.logger.error('Error creating vehicle', error.stack);
      throw error;
    }
  }

  async findByVin(vin: string): Promise<Vehicle | undefined> {
    try {
      return this.vehicleRepository.findOne({ where: { vin } });
    } catch (error) {
      this.logger.error('Error finding vehicle by VIN', error.stack);
      throw error;
    }
  }

  async update(id: number, vehicle: Partial<Vehicle>): Promise<Vehicle> {
    try {
      await this.vehicleRepository.update(id, vehicle);
      return this.vehicleRepository.findOne({ where: { vehicle_id:id } });
    } catch (error) {
      this.logger.error('Error updating vehicle', error.stack);
      throw error;
    }
  }

  async findVehiclesOlderThan(age: number): Promise<Vehicle[]> {
    try {
      const dateThreshold = new Date();
      dateThreshold.setFullYear(dateThreshold.getFullYear() - age);

      return this.vehicleRepository.createQueryBuilder('vehicle')
        .leftJoinAndSelect('vehicle.user', 'user')
        .where('vehicle.manufactured_date < :dateThreshold', { dateThreshold })
        .getMany();
    } catch (error) {
      this.logger.error('Error finding vehicles older than', { age, error });
      throw error;
    }
  }
}
