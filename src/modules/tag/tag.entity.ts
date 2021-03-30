import { BaseEntity, Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import PostEntity from 'modules/post/post.entity';

@Entity({
  name: 'tag',
})
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Index()
  @Column({
    length: 20,
  })
  name!: string;

  @Column()
  description!: string;

  @ManyToOne((type) => PostEntity, (post) => post.postTags, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;

  @Column()
  fk_post_idx!: number;
}