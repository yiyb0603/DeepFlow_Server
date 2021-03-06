import { PostEnums } from "lib/enum/post";
import Tag from "modules/tag/tag.entity";
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
} from "typeorm";
import User from "modules/user/user.entity";

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

  @ManyToOne((type) => User, { onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx: number;

  commentCount!: number;
  likeCount!: number;
  viewCount!: number;

  @OneToMany((type) => Tag, (tag) => tag.post, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  postTags!: string[];

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

  @Column({
    type: 'boolean',
    name: 'is_temp',
  })
  isTemp!: boolean;
}