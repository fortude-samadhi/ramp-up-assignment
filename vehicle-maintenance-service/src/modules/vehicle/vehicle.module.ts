import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';
import { VehicleController } from './controllers/vehicle.controller';
import { VehicleService } from './services/vehicle.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'shared-service/dist/entities/vehicle.entity';
import { User } from 'shared-service/dist/entities/user.entity';

@Module({
  imports: [
    BullModule.registerQueue(
      { name: 'import'},
      { name: 'export'},
    ),
    TypeOrmModule.forFeature([Vehicle, User]),
  ],
  
  controllers: [VehicleController],
  providers: [VehicleService]
})
export class VehicleModule {}
