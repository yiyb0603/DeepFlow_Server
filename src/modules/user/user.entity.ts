import { BaseEntity, Column, CreateDateColumn, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';
import { MajorEnums } from 'lib/enum/majors';
import { RankEnums } from 'lib/enum/ranks';

@Entity({
  name: 'user',
})
export default class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  idx!: number;

  // 사용자 깃허브 ID
  @Index()
  @Column({
    name: 'github_id',
    unique: true,
  })
  githubId!: string;

  // 사용자 이름
  @Column()
  name!: string;

  @Index()
  @Column({
    unique: true,
  })
  email!: string;

  // 사용자 기수
  @Column({
    type: 'int',
  })
  generation!: number;

  // 사용자 프로필 이미지
  @Column()
  avatar!: string;

  // 한줄 소개
  @Column({
    length: 100,
  })
  description!: string;

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
    length: 50,
  })
  location: string;

  // 사용자 개인 사이트
  @Column({
    length: 100,
  })
  blog!: string;

  // 주 개발 업무
  @Column({
    length: 50,
  })
  position!: string;

  recommandCount!: number;

  // 사용자 등급
  @Column({
    nullable: true,
    default: RankEnums.BRONZE,
    type: 'enum',
    enum: RankEnums,
  })
  rank!: RankEnums;

  // 사용자 가입일
  @CreateDateColumn({
    name: 'joined_at',
    type: 'timestamp',
  })
  joinedAt!: Date;

  @Column({
    type: 'boolean',
    name: 'is_admin',
    default: false,
  })
  isAdmin!: boolean;
}