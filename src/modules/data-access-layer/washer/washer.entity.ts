import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ShopEntity } from '../shops/shop.entity';

export enum WasherStatus {
  READY = 'READY',
  RESERVED = 'RESERVED',
  RUNNING = 'RUNNING',
  OFF = 'OFF',
}

@Entity({ name: 'washers' })
export class WasherEntity {
  @PrimaryGeneratedColumn()
  @Index()
  id: number;

  @Column()
  status: WasherStatus;

  @ManyToOne(() => ShopEntity, (shop) => shop.washers)
  shop: ShopEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
