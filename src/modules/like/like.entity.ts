import PostEntity from "modules/post/post.entity";
import User from "modules/user/user.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'like',
})
export default class LikeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx!: number;

  @ManyToOne((type) => PostEntity)
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;

  @Column()
  fk_post_idx: number;

  @CreateDateColumn({
    name: 'pressed_at',
  })
  pressedAt: Date;
}