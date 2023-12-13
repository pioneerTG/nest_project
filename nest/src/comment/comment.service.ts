import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CommentEntity } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly commentRepository: Repository<CommentEntity>,
  ) {}

  async create(createCommentDto: CreateCommentDto) {
    console.log('실행');

    const { userName, boardId, comment } = createCommentDto;
    try {
      console.log('저장');
      await this.commentRepository.save({
        userName,
        boardId,
        comment,
      });
      console.log('저장 완료');
    } catch (e) {
      console.log(e);
    }
  }

  async findAll(id: number) {
    try {
      return await this.commentRepository.findBy({ boardId: id });
    } catch (e) {
      console.log(e);
    }
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const { userName, boardId, comment } = updateCommentDto;
    try {
      console.log('댓글수정시작');
      await this.commentRepository.update(id, {
        userName,
        boardId,
        comment,
      });
      console.log('댓글수정완료');
    } catch (e) {
      console.log(e);
    }
  }

  async remove(id: number) {
    try {
      await this.commentRepository.delete({ id });
    } catch (e) {
      console.log(e);
    }
  }
}
