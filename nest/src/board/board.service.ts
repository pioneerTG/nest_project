import { Injectable, NotFoundException, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BoardEntity } from './entities/board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(BoardEntity)
    private readonly boardRepository: Repository<BoardEntity>,
  ) {}

  async create(ceateBoardDto: CreateBoardDto) {
    console.log('생성');
    const { userName, title, content } = ceateBoardDto;
    console.log('저장');
    await this.boardRepository.save({
      userName,
      title,
      content,
    });
    console.log('저장 완료');
  }

  async findAll() {
    return await this.boardRepository.find();
  }

  async findOne(id: number) {
    const board = await this.boardRepository.findOneBy({ id });

    if (!board) {
      throw new NotFoundException('게시글을 찾을 수 없습니다.');
    }

    return board;
  }

  async update(id: number, updateBoardDto: UpdateBoardDto) {
    const { userName, title, content } = updateBoardDto;

    await this.boardRepository.update(id, {
      userName,
      title,
      content,
    });
  }

  async remove(id: number) {
    await this.boardRepository.delete(id);
  }
}
