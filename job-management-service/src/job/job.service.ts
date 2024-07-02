import { BadRequestException, Injectable } from '@nestjs/common';
import { Logger } from 'nestjs-pino';

import { ParseCsvService } from './parse-csv.service';
import { ParseExcelService } from './parse-excel.service';
import { VehicleRepository } from './vehicle.repository';
import { createObjectCsvWriter } from 'csv-writer';
// import { UserRepository } from './user.repository';
import { Vehicle } from 'shared-service/dist/entities/vehicle.entity';
import { User } from 'shared-service/dist/entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';
import { NotificationService } from './notification.service';



@Injectable()
export class JobService {
    
  constructor(
    private readonly vehicleRepository2: VehicleRepository,
    // private readonly userRepository2: UserRepository,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(Vehicle) private readonly vehicleRepository: Repository<Vehicle>,
    private readonly parseCsvService: ParseCsvService,
    private readonly parseExcelService: ParseExcelService,
    private readonly logger: Logger,
    private readonly dataSource: DataSource,
    private readonly notificationService: NotificationService,

  ) {}

  async processFile(fileBuffer: Buffer, fileExtension: string) {
    
    try {
      let vehicles;
      if (fileExtension === 'csv') {
        vehicles = await this.parseCsvService.parseCsv(fileBuffer);
      } else if (fileExtension === 'xlsx') {
        vehicles = await this.parseExcelService.parseExcel(fileBuffer);
      } else {
        throw new Error('Unsupported file format');
      }

      const chunkSize = 100;
      for (let i = 0; i < vehicles.length; i += chunkSize) {
        const chunk = vehicles.slice(i, i + chunkSize);
        await this.processVehicles(chunk);
      }
    return true;
    } catch (error) {
      this.logger.error('Error processing file', error.stack);
      throw error;
    }
  }

  async processVehicles(vehicles: any[]) {
    try {
        for(let vehicleData of vehicles){
            const { first_name, last_name, email, car_make, car_model, vin, manufactured_date } = vehicleData;
            // Validate and parse manufactured_date
            const manufacturedDate = new Date(manufactured_date);
            if (isNaN(manufacturedDate.getTime())) {
                throw new BadRequestException('Invalid manufactured_date format');
            }

            // Calculate age of vehicle
            const today = new Date();
            const ageOfVehicle = today.getFullYear() - manufacturedDate.getFullYear();

            const queryRunner = this.dataSource.createQueryRunner();
            await queryRunner.connect();
            await queryRunner.startTransaction();

            try {
                // Check if user already exists
                let user = await queryRunner.manager.findOne(User, { where: { email } });

                // If user does not exist, create a new user
                if (!user) {
                user = new User();
                user.first_name = first_name;
                user.last_name = last_name;
                user.email = email;

                // Save the new user
                user = await queryRunner.manager.save(User, user);
                }

                // Create new Vehicle
                const vehicle = new Vehicle();
                vehicle.car_make = car_make;
                vehicle.car_model = car_model;
                vehicle.vin = vin;
                vehicle.manufactured_date = manufacturedDate;
                vehicle.age_of_vehicle = ageOfVehicle; // Set age_of_vehicle
                vehicle.user = user;

                // Save the vehicle
                await queryRunner.manager.save(Vehicle, vehicle);

                // Commit transaction
                await queryRunner.commitTransaction();
            } catch (e) {
                // Rollback transaction in case of error
                await queryRunner.rollbackTransaction();
                throw e;
            } finally {
                // Release query runner
                await queryRunner.release();
            }
        }
    } catch (error) {
        throw error;
    }

  }

  async exportVehicles(ageCriteria: number): Promise<string> {
    try {
      const vehicles = await this.vehicleRepository2.findVehiclesOlderThan(ageCriteria);
      function flattenVehicle(vehicle: Vehicle) {
        return {
          id: vehicle.vehicle_id,
          first_name: vehicle.user.first_name,
          last_name: vehicle.user.last_name,
          email: vehicle.user.email,
          car_make: vehicle.car_make,
          car_model: vehicle.car_model,
          vin: vehicle.vin,
          manufactured_date: vehicle.manufactured_date,
          age_of_vehicle: vehicle.age_of_vehicle,
        };
      }
      // Ensure the 'data' folder exists
      const dataFolderPath = path.resolve(__dirname, '../../data');
      if (!fs.existsSync(dataFolderPath)) {
        fs.mkdirSync(dataFolderPath, { recursive: true });
        this.logger.log(`Created 'data' folder at path: ${dataFolderPath}`);
      }

      // Generate time-based name for the CSV file
      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const csvFilePath = path.join(dataFolderPath, `vehicles-${timestamp}.csv`);

      const csvWriter = createObjectCsvWriter({
        path: csvFilePath,
        header: [
          { id: 'id', title: 'ID' },
          { id: 'first_name', title: 'First Name' },
          { id: 'last_name', title: 'Last Name' },
          { id: 'email', title: 'Email' },
          { id: 'car_make', title: 'Car Make' },
          { id: 'car_model', title: 'Car Model' },
          { id: 'vin', title: 'VIN' },
          { id: 'manufactured_date', title: 'Manufactured Date' },
          { id: 'age_of_vehicle', title: 'Age of Vehicle' },
        ],
      });

      await csvWriter.writeRecords(vehicles.map((vehicle)=>flattenVehicle(vehicle)));
      this.logger.log('Export completed successfully');
       this.notificationService.sendNotificationToClient("finished the export csv file");
      return csvFilePath;
    } catch (error) {
      this.logger.error('Error exporting vehicles', { error });
      throw error;
    }
  }
}
