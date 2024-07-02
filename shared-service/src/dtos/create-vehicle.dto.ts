export class CreateVehicleDto {
    user_id!: number;
    car_make!: string;
    car_model!: string;
    vin!: string;
    manufactured_date!: Date;
    age_of_vehicle!: number;
  }
  