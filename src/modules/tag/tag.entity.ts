import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PostEntity from "modules/post/post.entity";

@Entity({
  name: 'tag',
})
export default class Tag extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column({
    length: 20,
  })
  name!: string;

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