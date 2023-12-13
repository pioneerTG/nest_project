import { Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { BoardEntity } from './entities/board.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { MulterModule } from '@nestjs/platform-express';
import { multerOptions } from 'src/config/multer.config';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity, BoardEntity, CommentEntity]),
    MulterModule.register(multerOptions),
  ],
  controllers: [BoardController],
  providers: [BoardService],
  exports: [BoardService],
})
export class BoardModule {}
