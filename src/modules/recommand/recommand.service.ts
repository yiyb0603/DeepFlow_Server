import { Injectable } from "@nestjs/common";
import HttpError from "exception/HttpError";
import User from "modules/user/user.entity";
import UserService from "modules/user/user.service";
import { RecommandDto } from "./dto/recommand.dto";
import Recommand from "./recommand.entity";
import RecommandRepository from "./recommand.repository";

@Injectable()
export default class RecommandService {
  constructor(
    private readonly recommandRepository: RecommandRepository,

    private readonly userService: UserService,
  ) {}
  
  public async handleAddRecommand(recommandDto: RecommandDto, user: User): Promise<void> {
    const targetUser: User = await this.userService.getUserInfoByIdx(recommandDto.userIdx);
    const existRecommand: Recommand = await this.recommandRepository.getRecommandByPressedUserIdx(targetUser.idx, user.idx);

    if (existRecommand !== undefined) {
      throw new HttpError(409, '이미 추천한 사용자입니다.');
    }

    if (targetUser.idx === user.idx) {
      throw new HttpError(403, '자기 자신을 추천할 수 없습니다.');
    }

    const pressedUser: User = await this.userService.getUserInfoByIdx(user.idx);

    const recommand: Recommand = new Recommand();
    recommand.user = targetUser;
    recommand.pressedUser = pressedUser;
    recommand.recommandAt = new Date();
    await this.recommandRepository.save(recommand);
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
  }
}