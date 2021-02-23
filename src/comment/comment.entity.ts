import PostEntity from "post/post.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "user/user.entity";

@Entity({
  name: 'comment',
})
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    length: 255,
  })
  contents!: string;

  @ManyToOne((type) => PostEntity, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;

  @ManyToOne((type) => User, { onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column({
    name: 'created_at',
  })
  createdAt!: Date;

  @Column({
    name: 'updated_at',
    nullable: true,
    default: null,
  })
  updatedAt: Date;
}