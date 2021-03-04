import { Body, Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { Token } from "lib/decorator/user.decorator";
import AuthGuard from "middleware/auth";
import User from "modules/user/user.entity";
import { RecommandDto } from "./dto/recommand.dto";
import RecommandService from "./recommand.service";

@Controller('recommand')
export default class RecommandController {
  constructor(
    private readonly recommandService: RecommandService,
  ) {}
  
  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleAddRecommand(
    @Token() user: User,
    @Body() recommandDto: RecommandDto,
  ) {
    await this.recommandService.handleAddRecommand(recommandDto, user);

    return {
      status: 200,
      message: '사용자 추천을 성공하였습니다.',
    };
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleRemoveRecommand(
    @Token() user: User,
    @Param('idx') recommandIdx: number,
  ) {
    await this.recommandService.handleRemoveRecommand(recommandIdx, user);

    return {
      status: 200,
      message: '사용자 추천을 삭제하였습니다.',
    };
  }
}