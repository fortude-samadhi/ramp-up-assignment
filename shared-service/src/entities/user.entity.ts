import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Vehicle } from './vehicle.entity';

@Entity('user_tbl')
export class User {
  @PrimaryGeneratedColumn()
  user_id!: number;

  @Column()
  first_name!: string;

  @Column()
  last_name!: string;

  @Column()
  email!: string;

  @OneToMany(() => Vehicle, vehicle => vehicle.user)
  vehicles!: Vehicle[];
}
