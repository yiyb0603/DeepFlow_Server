import { Body, Controller, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { Token } from 'lib/decorator/user.decorator';
import AuthGuard from 'middleware/auth';
import { IGithubUser } from 'types/user.types';
import { GithubCodeDto, ModifyUserDto, SetFCMDto, UserDto } from './dto/user.dto';
import User from './user.entity';
import UserService from './user.service';

@Controller('user')
export default class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @Post('/sign-up')
  public async handleSignUp(@Body() signUpDto: UserDto) {
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

  @Get('/popular')
  public async getPopularUserList(
    @Query('count') count: number,
  ) {
    const users: User[] = await this.userService.getPopularUserList(count);

    return {
      status: 200,
      message: '인기 유저목록을 조회하였습니다.',
      data: {
        users,
      },
    };
  }

  @Get('/:idx')
  public async getUserInfo(@Param('idx') userIdx: number) {
    const user: User = await this.userService.getUserInfoByIdx(userIdx);

    return {
      status: 200,
      message: '유저 정보를 조회하였습니다.',
      data: {
        user,
      },
    };
  }

  @Put('/')
  @UseGuards(new AuthGuard())
  public async modifyUserInfo(@Token() user: User, @Body() modifyUserDto: ModifyUserDto) {
    await this.userService.modifyUserInfo(user.idx, modifyUserDto);

    return {
      status: 200,
      message: '유저 정보 수정을 성공하였습니다.',
    };
  }

  @Post('/fcm')
  @UseGuards(new AuthGuard())
  public async setFCMToken(
    @Token() user: User,
    @Body() setFCMDto: SetFCMDto,
  ) {
    await this.userService.setFCMToken(setFCMDto, user);

    return {
      status: 200,
      message: 'FCM 토큰을 저장하였습니다.',
    };
  }
}