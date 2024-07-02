import { IsEnum, IsInt, IsOptional, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @Min(1)
  @Type(() => Number)
  page: number;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  size: number;

  @IsOptional()
  @IsString()
  sortField?: string;

  @IsOptional()
  @IsEnum(['ASC', 'DESC'])
  sortOrder?: 'ASC' | 'DESC';
}


export class UserVehicleResponseDto {
  user_id: number;
  first_name: string;
  last_name: string;
  email: string;
  vehicle_id: number;
  car_make: string;
  car_model: string;
  vin: string;
  manufactured_date: Date;
  age_of_vehicle: number;
}
