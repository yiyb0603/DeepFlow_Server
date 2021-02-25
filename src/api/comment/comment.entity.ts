import PostEntity from "api/post/post.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import User from "api/user/user.entity";

@Entity({
  name: 'comment',
})
export default class Comment extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    type: 'text',
  })
  contents!: string;

  @ManyToOne((type) => PostEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;

  @ManyToOne((type) => User)
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx!: number;

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