import { Controller, Get, Post, Body, Delete, Param, UseInterceptors, UploadedFile, Res, Patch } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  // 게시물 작성
  @Post('write')
  create(@Body() createPostDto: CreateBoardDto) {
    return this.boardService.create(createPostDto);
  }

  // 이미지 업로드
  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(@UploadedFile() file) {
    if (!file) {
      console.log('이미지가 없습니다.');
      return { image: null };
    }

    console.log('이미지 업로드 완료');
    const image = `/uploads/${file.filename}`;
    return { image };
  }

  // 모든 게시물 조회
  @Get()
  async findAll() {
    return await this.boardService.findAll();
  }

  // 특정 ID의 게시물 조회
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.boardService.findOne(id);
  }

  // 이미지 다운로드
  @Get('uploads/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const image = path.join(__dirname, '..', '..', 'uploads', filename);
    console.log(image);

    if (fs.existsSync(image)) {
      return res.sendFile(image);
    } else {
      return res.status(404).send('Not Found');
    }
  }

  // 게시물 업데이트
  @Patch(':id')
  async update(@Param('id') id: number, @Body() updateBoardDto: UpdateBoardDto) {
    return await this.boardService.update(id, updateBoardDto);
  }

  // 게시물 삭제
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.boardService.remove(+id);
  }
}