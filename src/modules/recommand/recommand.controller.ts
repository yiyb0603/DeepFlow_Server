import { Body, Controller, Delete, Param, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from 'express';
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
    @Res() response: Response,
    @Token() user: User,
    @Body() recommandDto: RecommandDto,
  ) {
    await this.recommandService.handleAddRecommand(recommandDto, user);

    return response.status(200).json({
      status: 200,
      message: '사용자 추천을 성공하였습니다.',
    });
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleRemoveRecommand(
    @Res() response: Response,
    @Token() user: User,
    @Param('idx') recommandIdx: number,
  ) {
    await this.recommandService.handleRemoveRecommand(recommandIdx, user);

    return response.status(200).json({
      status: 200,
      message: '사용자 추천을 삭제하였습니다.',
    })
  }
}