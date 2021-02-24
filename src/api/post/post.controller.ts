import { Body, Controller, Delete, Get, Param, Post, Query, Res, UseGuards } from "@nestjs/common";
import User from "api/user/user.entity";
import { Response } from 'express';
import { Token } from "lib/decorator/user.decorator";
import { PostEnums } from "lib/enum/post";
import AuthGuard from "middleware/auth";
import { CreatePostDto } from "./dto/post.dto";
import PostEntity from "./post.entity";
import PostService from "./post.service";

@Controller('post')
export default class PostController {
  constructor(
    private readonly postService: PostService,
  ) {}

  @Get('/')
  public async getPostsByCategory(@Res() response: Response, @Token() user: User, @Query('category') category: PostEnums) {
    const posts: PostEntity[] = await this.postService.getPostsByCategory(category);
    
    return response.status(200).json({
      status: 200,
      message: '글 목록을 조회하였습니다.',
      data: {
        posts,
      },
    });
  }

  @Get('/:idx')
  public async getPost(@Res() response: Response, @Param('idx') postIdx: number) {
    const post: PostEntity = await this.postService.getPost(postIdx);
    return response.status(200).json({
      status: 200,
      message: '글을 조회하였습니다.',
      data: {
        post,
      },
    });
  }

  @Post('/')
  @UseGuards(new AuthGuard())
  public async handleCreatePost(@Res() response: Response, @Body() createPostDto: CreatePostDto) {
    await this.postService.handleCreatePost(createPostDto);

    return response.status(200).json({
      status: 200,
      message: '글 작성을 성공하였습니다.',
    });
  }

  @Delete('/:idx')
  @UseGuards(new AuthGuard())
  public async handleDeletePost(@Res() response: Response, @Param('idx') postIdx: number) {
    await this.postService.handleDeletePost(postIdx);

    return response.status(200).json({
      status: 200,
      message: '글 삭제를 성공하였습니다.',
    });
  }
}