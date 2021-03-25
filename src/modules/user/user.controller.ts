import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { IGithubUser } from 'types/user.types';
import { GithubCodeDto, SignUpDto } from './dto/user.dto';
import User from './user.entity';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/sign-up')
  public async handleSignUp(@Body() signUpDto: SignUpDto) {
    const token: string = await this.userService.handleSignUp(signUpDto);

    return {
      status: 200,
      message: '회원가입을 성공하였습니다.',
      data: {
        accessToken: token,
      },
    };
  }

  @Post('/github-info')
  public async getGithubInfo(@Body() githubCodeDto: GithubCodeDto) {
    const githubInfo: IGithubUser = await this.userService.getGithubInfo(githubCodeDto);
    const token: string = await this.userService.getToken(githubInfo.githubId);

    if (token !== null) {
      return {
        status: 200,
        message: '로그인을 성공하였습니다.',
        data: {
          accessToken: token,
        },
      };
    } else {
      return {
        status: 200,
        message: '유저 깃허브 정보를 조회하였습니다.',
        data: {
          githubInfo,
        },
      };
    }
  }

  @Get('/list')
  public async getUserList() {
    const users: User[] = await this.userService.getUserList();

    return {
      status: 200,
      message: '유저 목록을 조회하였습니다.',
      data: {
        users,
      },
    };
  }

  @Get('/:id')
  public async getUserInfo(@Param('id') userIdx: number) {
    const user: User = await this.userService.getUserInfoByIdx(userIdx);

    return {
      status: 200,
      message: '유저 정보를 조회하였습니다.',
      data: {
        user,
      },
    };
  }
}