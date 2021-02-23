import { Injectable } from "@nestjs/common";
import axios, { AxiosResponse } from 'axios';
import { CLIENT_ID, CLIENT_SECRET } from 'config/config.json';
import HttpError from "exception/HttpError";
import { createToken } from "lib/token";
import { IGithubUserTypes } from "types/user.types";
import { GithubCodeDto, SignUpDto } from "./dto/user.dto";
import User from "./user.entity";
import UserRepository from "./user.repository";

@Injectable()
export default class UserService {
  constructor(
    private readonly userRepository: UserRepository
  ) {}

  public async handleSignUp(signUpDto: SignUpDto): Promise<string> {
    const { githubInfo, generation, major } = signUpDto;
    const { githubId, avatar, name, description, location } = githubInfo;

    const existUser = await this.userRepository.findById(githubInfo.githubId);
    if (existUser) {
      throw new HttpError(409, '이미 존재하는 유저입니다.');
    }

    const user = new User();
    user.githubId = githubId;
    user.name = name;
    user.avatar = avatar;
    user.description = description;
    user.location = location;
    user.generation = generation;
    user.major = major;
    user.joinedAt = new Date();

    await this.userRepository.save(user);
    const token: string = createToken(githubId);
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

    const { login, avatar_url, name, bio, location } = data;
    const githubInfo: IGithubUserTypes = {
      githubId: login,
      avatar: avatar_url,
      name,
      description: bio,
      location,
    };

    return githubInfo;
  }

  public async getToken(id: string): Promise<string> | null {
    const user: User = await this.userRepository.findById(id);
    if (user) {
      const token: string = createToken(user.githubId);
      return token;
    } else {
      return null;
    }
  }

  public async getUserInfo(id: string): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new HttpError(404, '존재하지 않는 유저입니다.');
    }

    return user;
  }
}