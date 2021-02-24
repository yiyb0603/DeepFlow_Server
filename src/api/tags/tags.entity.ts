import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import PostEntity from "api/post/post.entity";

@Entity({
  name: 'tags',
})
export default class Tags extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  @Column()
  name!: string;

  @ManyToOne((type) => PostEntity, { onDelete: 'CASCADE', onUpdate: 'CASCADE' })
  @JoinColumn({
    name: 'fk_post_idx',
  })
  post!: PostEntity;
}