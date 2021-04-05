import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Comment from 'modules/comment/comment.entity';
import User from 'modules/user/user.entity';

@Entity({
  name: 'comment_emoji',
})
export default class CommentEmoji extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    length: 1,
  })
  emoji!: string;

  @ManyToOne((type) => User, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  users: CommentEmoji[];

  @Column()
  fk_user_idx!: number;

  @ManyToOne((type) => Comment, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_comment_idx',
  })
  comment!: Comment;

  @Column()
  fk_comment_idx!: number;

  @CreateDateColumn({
    name: 'pressed_at',
  })
  pressedAt!: Date;
}