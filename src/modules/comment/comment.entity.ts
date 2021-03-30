import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import PostEntity from 'modules/post/post.entity';
import User from 'modules/user/user.entity';

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
  })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;

  @Column()
  fk_post_idx!: number;

  @ManyToOne((type) => User, {
    onDelete: 'SET NULL',
  })
  @JoinColumn({
    name: 'fk_user_idx',
  })
  user!: User;

  @Column()
  fk_user_idx!: number;

  @CreateDateColumn({
    name: 'created_at',
    type: 'timestamp',
  })
  createdAt!: Date;

  @UpdateDateColumn({
    nullable: true,
    default: null,
    name: 'updated_at',
  })
  updatedAt: Date;
}