import { MajorEnums } from "lib/enum/majors";
import { RankEnums } from "lib/enum/ranks";
import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'user',
})
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx: number;

  // 사용자 깃허브 ID
  @Column({
    name: 'github_id',
  })
  githubId!: string;

  // 사용자 이름
  @Column()
  name!: string;

  // 사용자 기수
  @Column()
  generation!: number;

  // 사용자 전공
  @Column({
    type: 'enum',
    enum: MajorEnums,
  })
  major!: MajorEnums;

  // 사용자 거주지
  @Column({
    nullable: true,
    default: 'DGSW',
  })
  location: string;

  // 사용자 프로필 이미지
  @Column()
  avatar!: string;

  // 한줄 소개
  @Column({
    length: 255,
  })
  description!: string;

  // 추천받은 개수
  @Column({
    default: 0,
    name: 'recommand_count',
  })
  recommandCount!: number;

  // 사용자 등급
  @Column({
    nullable: true,
    default: RankEnums.BRONZE,
    enum: RankEnums,
  })
  rank!: RankEnums;

  // 사용자 가입일
  @CreateDateColumn({
    name: 'joined_at',
  })
  joinedAt!: Date;
}