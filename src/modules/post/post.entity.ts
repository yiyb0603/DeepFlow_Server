import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { EPost } from 'lib/enum/post';
import Tag from 'modules/tag/tag.entity';
import User from 'modules/user/user.entity';
import Comment from 'modules/comment/comment.entity';
import Reply from 'modules/reply/reply.entity';
import View from 'modules/view/view.entity';
import LikeEntity from 'modules/like/like.entity';

@Entity({
  name: 'post',
})
export default class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    type: 'enum',
    enum: EPost,
  })
  category!: EPost;

  @Column({
    length: 100,
  })
  title!: string;

  @Column({
    length: 150,
  })
  introduction!: string;

  @Column({
    nullable: true,
    default: null,
  })
  thumbnail: string;

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
  fk_user_idx: number;

  @OneToMany((type) => Tag, (tag) => tag.post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  postTags!: string[];

  @OneToMany((type) => Comment, (comment) => comment.post)
  comments: Comment[];
  commentCount!: number;

  @OneToMany((type) => Reply, (reply) => reply.post)
  replies: Reply[];
  replyCount!: number;
  
  @OneToMany((type) => View, (view) => view.post)
  views: View[];
  viewCount!: number;

  @OneToMany((type) => LikeEntity, (like) => like.post)
  likes: LikeEntity[];
  likeCount!: number;

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

  @Column({
    type: 'boolean',
    name: 'is_temp',
  })
  isTemp!: boolean;
}