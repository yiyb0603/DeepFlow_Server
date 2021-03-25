import User from "modules/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'recommand',
})
export default class Recommand extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @ManyToOne((type) => User, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx: number;

  @ManyToOne((type) => User, {
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_pressed_user_idx',
  })
  pressedUser!: User;

  @Column()
  fk_pressed_user_idx: number;

  @CreateDateColumn({
    name: 'recommand_at',
    type: 'timestamp',
  })
  recommandAt!: Date;
}