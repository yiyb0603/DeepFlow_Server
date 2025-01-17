import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Comment from 'modules/comment/comment.entity';
import PostEntity from 'modules/post/post.entity';
import User from 'modules/user/user.entity';

@Entity({
  name: 'reply',
})
export default class Reply extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    type: 'text',
  })
  contents: string;

  @ManyToOne((type) => User, { onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx!: number;

  @ManyToOne((type) => PostEntity, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;

  @Column()
  fk_post_idx: number;

  @ManyToOne((type) => Comment, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_comment_idx',
  })
  comment!: Comment;

  @Column()
  fk_comment_idx!: number;

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