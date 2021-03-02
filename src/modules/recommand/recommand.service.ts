import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import HttpError from "exception/HttpError";
import User from "modules/user/user.entity";
import UserRepository from "modules/user/user.repository";
import UserService from "modules/user/user.service";
import { RecommandDto } from "./dto/recommand.dto";
import Recommand from "./recommand.entity";
import RecommandRepository from "./recommand.repository";

@Injectable()
export default class RecommandService {
  constructor(
    private readonly recommandRepository: RecommandRepository,

    @InjectRepository(User)
    private readonly userRepository: UserRepository,

    private readonly userService: UserService,
  ) {}
  
  public async handleAddRecommand(recommandDto: RecommandDto, user: User): Promise<void> {
    const targetUser: User = await this.userService.getUserInfo(recommandDto.userId);
    const existRecommand: Recommand = await this.recommandRepository.getRecommandByPressedUserIdx(targetUser.idx, user.idx);

    if (existRecommand !== undefined) {
      throw new HttpError(409, '이미 추천한 사용자입니다.');
    }

    const pressedUser: User = await this.userService.getUserInfo(user.githubId);

    const recommand: Recommand = new Recommand();
    recommand.user = targetUser;
    recommand.pressedUser = pressedUser;
    recommand.recommandAt = new Date();

    await this.recommandRepository.save(recommand);

    targetUser.recommandCount++;
    await this.userRepository.save(targetUser);
  }

  public async handleRemoveRecommand(recommandIdx: number, user: User) {
    const existRecommand: Recommand = await this.recommandRepository.getRecommandByIdx(recommandIdx);

    if (existRecommand === undefined) {
      throw new HttpError(404, '존재하지 않는 추천입니다.');
    }

    if (existRecommand.fk_pressed_user_idx !== user.idx) {
      throw new HttpError(403, '추천을 삭제할 권한이 없습니다.');
    }

    await this.recommandRepository.remove(existRecommand);
    
    existRecommand.user.recommandCount--;
    await this.userRepository.save(existRecommand.user);
  }
}