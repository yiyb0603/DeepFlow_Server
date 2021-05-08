import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Notice from 'modules/notice/notice.entity';

@Entity({
  name: 'notice_view',
})
export default class NoticeView extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @ManyToOne((type) => Notice, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_notice_idx',
  })
  notice!: Notice;

  @Column()
  fk_notice_idx!: number;

  @Column({
    name: 'user_ip',
  })
  userIp!: string;
}