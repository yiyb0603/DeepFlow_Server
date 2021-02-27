import PostEntity from "modules/post/post.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'view',
})
export default class View extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @ManyToOne((type) => PostEntity, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;

  @Column()
  fk_post_idx!: number;

  @Column({
    name: 'user_ip',
  })
  userIp!: string;
}