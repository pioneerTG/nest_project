import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { BoardEntity } from 'src/board/entities/board.entity';
import { CommentEntity } from './entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity, BoardEntity, CommentEntity])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
