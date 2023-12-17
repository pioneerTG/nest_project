import { Controller, Post, Body, Param, Get, Patch, Delete } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  // 댓글 작성
  @Post(':id/write')
  create(@Body() createCommentDto: CreateCommentDto) {
    return this.commentService.create(createCommentDto);
  }

  // 특정 게시물의 모든 댓글 조회
  @Get(':id')
  findAll(@Param('id') postId: string) {
    const parsedPostId = +postId;
    return this.commentService.findAll(parsedPostId);
  }

  // 댓글 업데이트
  @Patch(':id')
  update(@Param('id') commentId: string, @Body() updateCommentDto: UpdateCommentDto) {
    const parsedCommentId = +commentId;
    return this.commentService.update(parsedCommentId, updateCommentDto);
  }

  // 댓글 삭제
  @Delete(':id')
  remove(@Param('id') commentId: string) {
    const parsedCommentId = +commentId;
    return this.commentService.remove(parsedCommentId);
  }
}