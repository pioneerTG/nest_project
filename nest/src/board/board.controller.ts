import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseInterceptors,
  UploadedFile,
  Put,
  Res,
  Patch,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import * as fs from 'fs';
import { Response } from 'express';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post('write')
  create(@Body() createPostDto: CreateBoardDto) {
    return this.boardService.create(createPostDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('content'))
  async uploadImage(@UploadedFile() file) {
    if (!file) {
      console.log('이미지가 없습니다.');
      return { content: null };
    }

    console.log('이미지 업로드 완료');
    const content = `/uploads/${file.filename}`;
    return { content };
  }

  @Get()
  async findAll() {
    return await this.boardService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.boardService.findOne(id);
  }

  @Get('uploads/:filename')
  async getImage(@Param('filename') filename: string, @Res() res: Response) {
    const content = path.join(__dirname, '..', '..', 'uploads', filename);
    console.log(content);

    if (fs.existsSync(content)) {
      return res.sendFile(content);
    } else {
      return res.status(404).send('Not Found');
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ) {
    return await this.boardService.update(id, updateBoardDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.boardService.remove(+id);
  }
}
