import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import axios, { AxiosResponse } from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from 'config/config.json';
import HttpError from 'exception/HttpError';
import generateRank from 'lib/generateRank';
import { createToken } from 'lib/token';
import Recommand from 'modules/recommand/recommand.entity';
import RecommandRepository from 'modules/recommand/recommand.repository';
import { IGithubUserTypes } from 'types/user.types';
import { GithubCodeDto, SignUpDto } from './dto/user.dto';
import User from './user.entity';
import UserRepository from './user.repository';

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository,

    @InjectRepository(Recommand)
    private readonly recommandRepository: RecommandRepository,
  ) {}

  public async handleSignUp(signUpDto: SignUpDto): Promise<string> {
    const { githubId, avatar, name, description, location, blog, generation, major, position } = signUpDto;

    const existUser = await this.userRepository.getUserById(githubId);
    if (existUser) {
      throw new HttpError(409, '이미 존재하는 유저입니다.');
    }

    const user: User = new User();
    user.githubId = githubId;
    user.name = name;
    user.avatar = avatar; 
    user.description = description;
    user.location = location;
    user.generation = generation;
    user.major = major;
    user.blog = blog;
    user.position = position;
    user.joinedAt = new Date();
    user.isAdmin = false;

    await this.userRepository.save(user);
    const joinedUser = await this.userRepository.getUserById(githubId);
    const token: string = createToken(joinedUser.idx, joinedUser.githubId, joinedUser.isAdmin);
    return token;
  }

  public async getGithubInfo(githubCodeDto: GithubCodeDto): Promise<IGithubUserTypes> {
    const { code } = githubCodeDto;
    const getTokenUrl: string = 'https://github.com/login/oauth/access_token';

    const request = {
      code,
      client_id: CLIENT_ID,
      client_secret: CLIENT_SECRET,
    };

    const response: AxiosResponse = await axios.post(getTokenUrl, request, {
      headers: {
        accept: 'application/json',
      },
    });

    if (response.data.error) {
      throw new HttpError(401, '깃허브 인증을 실패했습니다.');
    }

    const { access_token } = response.data;

    const getUserUrl: string = 'https://api.github.com/user';
    const { data } = await axios.get(getUserUrl, {
      headers: {
        Authorization: `token ${access_token}`,
      },
    });

    const { login, avatar_url, name, bio, company, blog } = data;
    const githubInfo: IGithubUserTypes = {
      githubId: login,
      avatar: avatar_url,
      name,
      description: bio,
      location: company,
      blog,
    };

    return githubInfo;
  }

  public async getUserList(): Promise<User[]> {
    const users: User[] = await this.userRepository.getUserList();
    return users;
  }

  public async getToken(id: string): Promise<string> | null {
    const user: User = await this.userRepository.getUserById(id);
    if (user !== undefined) {
      const token: string = createToken(user.idx, user.githubId, user.isAdmin);
      return token;
    } else {
      return null;
    }
  }

  public async getUserInfoByIdx(idx: number): Promise<User> {
    const user: User = await this.userRepository.getUserByIdx(idx);

    if (user === undefined) {
      throw new HttpError(404, '존재하지 않는 유저입니다.');
    }

    user.recommandCount = await this.recommandRepository.getRecommandCount(idx);
    user.rank = generateRank(user.recommandCount);

    return user;
  }
}