import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import User from "modules/user/user.entity";
import { Token } from "lib/decorator/user.decorator";
import { IpAddress } from "lib/decorator/ipAddress.decorator";
import { PostEnums } from "lib/enum/post";
import AuthGuard from "middleware/auth";
import { PostDto } from "./dto/post.dto";
import PostEntity from "./post.entity";
import PostService from "./post.service";

@Controller('post')
export default class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get('/')
  public async getPostsByCategory(
    @Query('category') category: PostEnums,
    @Query('page') page: number,
    @Query('userIdx') userIdx: number,
  ) {
    let posts: PostEntity[] = [];
    if (isNaN(Number(userIdx))) {
      posts = await this.postService.getPostsByCategory(category, page);
    } else {
      posts = await this.postService.getPostsByUserIdx(userIdx);
    }
    
    return {
      status: 200,
      message: '글 목록을 조회하였습니다.',
      data: {
        posts,
      },
    };
  }

  @Get('/search')
  public async handleSearchPost(
    @Query('keyword') keyword: string,
    @Query('category') category: PostEnums,
  ) {
    const searchPosts: PostEntity[] = await this.postService.handleSearchPost(keyword, category);
    
    return {
      status: 200,
      message: '글 목록을 검색하였습니다.',
      data: {
        searchPosts,
      },
    };
  }

  @Get('/temp')
  @UseGuards(new AuthGuard())
  public async getTempPosts(
    @Token() user: User,
  ) {
    const posts: PostEntity[] = await this.postService.getTempPosts(user);
    
    return {
      status: 200,
      message: '임시 글 목록을 조회하였습니다.',
      data: {
        posts,
      },
    };
  }

  @Get('/:idx')
  public async getPost(
    @IpAddress() ipAddress: string,
    @Param('idx') postIdx: number
  ) {
    const post: PostEntity = await this.postService.getPost(postIdx, ipAddress);

    return {
      status: 200,
      message: '글을 조회하였습니다.',
      data: {
        post,
      },
    };
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleCreatePost(
    @Token() user: User,
    @Body() createPostDto: PostDto
  ) {
    await this.postService.handleCreatePost(createPostDto, user);

    return {
      status: 200,
      message: '글 작성을 성공하였습니다.',
    };
  }

  @Put('/:idx')
  @UseGuards(new AuthGuard())
  public async handleModifyPost(
    @Token() user: User,
    @Param('idx') postIdx: number,
    @Body() modifyPostDto: PostDto
  ) {
    await this.postService.handleModifyPost(postIdx, modifyPostDto, user)

    return {
      status: 200,
      message: '글 수정을 성공하였습니다.',
    };
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeletePost(
    @Token() user: User,
    @Param('idx') postIdx: number
  ) {
    await this.postService.handleDeletePost(postIdx, user);

    return {
      status: 200,
      message: '글 삭제를 성공하였습니다.',
    };
  }
}