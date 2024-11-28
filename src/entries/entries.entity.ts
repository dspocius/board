import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Entries {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  description: string;
  @Column()
  is_project: number;
  @Column()
  board_id: number;
  @Column()
  position: number;
}