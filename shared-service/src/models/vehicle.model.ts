import { User } from '../entities/user.entity';
import { ServiceRecord } from '../entities/service-record.entity';

export interface VehicleModel {
  vehicle_id: number;
  user: User;
  car_make: string;
  car_model: string;
  vin: string;
  manufactured_date: Date;
  age_of_vehicle: number;
  serviceRecords: ServiceRecord[];
}
