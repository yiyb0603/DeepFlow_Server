import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { EMajor } from 'lib/enum/majors';
import { ERank } from 'lib/enum/ranks';
import CommentEmoji from 'modules/commentEmoji/commentEmoji.entity';

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
    enum: EMajor,
  })
  major!: EMajor;

  // 사용자 거주지
  @Column({
    nullable: true,
    default: 'DGSW',
    length: 100,
  })
  location: string;

  // 사용자 개인 사이트
  @Column({
    length: 100,
  })
  blog!: string;

  // 주 개발 업무
  @Column({
    length: 100,
  })
  position!: string;

  recommandCount!: number;

  // 사용자 등급
  @Column({
    nullable: true,
    default: ERank.BRONZE,
    type: 'enum',
    enum: ERank,
  })
  rank!: ERank;

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

  @Column({
    name: 'fcm_token',
    nullable: true,
    default: '',
  })
  fcmToken!: string;

  @Column({
    name: 'fcm_allow',
    type: 'boolean',
    nullable: true,
    default: false,
  })
  fcmAllow!: boolean;
}