// import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
// import { Vehicle } from 'src/modules/vehicle/entities/vehicle.entity';

// @Entity('service_records_tbl')
// export class ServiceRecord {
//   @PrimaryGeneratedColumn()
//   service_id: number;

//   @ManyToOne(() => Vehicle, vehicle => vehicle.serviceRecords)
//   vehicle: Vehicle;

//   @Column()
//   service_date: Date;

//   @Column()
//   description: string;

//   @Column()
//   cost: number;
// }
