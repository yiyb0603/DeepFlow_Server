import { Body, Controller, Get, Param, Post, Res } from "@nestjs/common";
import { Response } from 'express';
import { IGithubUserTypes } from "types/user.types";
import { GithubCodeDto, SignUpDto } from "./dto/user.dto";
import User from "./user.entity";
import UserService from "./user.service";

@Controller('user')
export default class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/sign-up')
  public async handleSignUp(@Res() response: Response, @Body() signUpDto: SignUpDto) {
    const token: string = await this.userService.handleSignUp(signUpDto);

    return response.status(200).json({
      status: 200,
      message: '회원가입을 성공하였습니다.',
      data: {
        accessToken: token,
      },
    });
  }

  @Post('/github-info')
  public async getGithubInfo(@Res() response: Response, @Body() githubCodeDto: GithubCodeDto) {
    const githubInfo: IGithubUserTypes = await this.userService.getGithubInfo(githubCodeDto);
    const token = await this.userService.getToken(githubInfo.githubId);

    if (token !== null) {
      return response.status(200).json({
        status: 200,
        message: '로그인을 성공하였습니다.',
        data: {
          accessToken: token,
        },
      });
    } else {
      return response.status(200).json({
        status: 200,
        message: '유저 깃허브 정보를 조회하였습니다.',
        data: {
          githubInfo,
        },
      });
    }
  }

  @Get('/:id')
  public async getUserInfo(@Res() response: Response, @Param('id') githubId: string) {
    const user: User = await this.userService.getUserInfo(githubId);

    return response.status(200).json({
      status: 200,
      message: '유저 정보를 조회하였습니다.',
      data: {
        user,
      },
    });
  }
}