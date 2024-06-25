import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity'
import { ServiceRecord } from 'src/modules/service-record/entities/service-record.entity';

@Entity('vehicles_tbl')
export class Vehicle {
  @PrimaryGeneratedColumn()
  vehicle_id: number;

  @ManyToOne(() => User, user => user.vehicles)
  user: User;

  @Column()
  car_make: string;

  @Column()
  car_model: string;

  @Column()
  vin: string;

  @Column()
  manufactured_date: Date;

  @Column()
  age_of_vehicle: number;

  @OneToMany(() => ServiceRecord, serviceRecord => serviceRecord.vehicle)
  serviceRecords: ServiceRecord[];
}

