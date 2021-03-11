import User from "modules/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({
  name: 'notice',
})
export default class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  contents!: string;

  @ManyToOne((type) => User, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx!: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    nullable: true,
    default: null,
  })
  updatedAt: Date;
}