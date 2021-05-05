import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import User from 'modules/user/user.entity';
import NoticeView from 'modules/noticeview/noticeView.entity';

@Entity({
  name: 'notice',
})
export default class Notice extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    length: 100,
  })
  title!: string;

  @Column({
    type: 'text',
  })
  contents!: string;

  @OneToMany((type) => NoticeView, (noticeView) => noticeView.notice)
  views!: NoticeView[];

  viewCount!: number;

  @ManyToOne((type) => User, {
    onDelete: 'SET NULL',
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
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamp',
    nullable: true,
    default: null,
  })
  updatedAt: Date;
}