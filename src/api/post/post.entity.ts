import { PostEnums } from "lib/enum/post";
import Tags from "api/tags/tags.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  RelationId,
  UpdateDateColumn,
} from "typeorm";
import User from "api/user/user.entity";

@Entity({
  name: 'post',
})
export default class PostEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  @Column({
    type: 'enum',
    enum: PostEnums,
  })
  category!: PostEnums;

  @Column()
  title!: string;

  @Column({
    type: 'text',
  })
  contents!: string;

  @ManyToOne((type) => User, { onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx: number;

  @Column({
    default: 0,
    name: 'comment_count',
  })
  commentCount!: number;

  @Column({
    default: 0,
    name: 'like_count',
  })
  likeCount!: number;

  @OneToMany((type) => Tags, (tag) => tag.post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  postTags!: Tags[];

  @Column({
    default: 0,
    name: 'view_count',
  })
  viewCount!: number;

  @CreateDateColumn({
    name: 'created_at',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null,
    name: 'updated_at',
  })
  updatedAt: Date;
}