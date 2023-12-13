import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { UserEntity } from './user/entities/user.entity';
import { BoardModule } from './board/board.module';
import { BoardEntity } from './board/entities/board.entity';
import { CommentEntity } from './comment/entities/comment.entity';
import { CommentModule } from './comment/comment.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`${__dirname}/config/env/.${process.env.NODE_ENV}.env`],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '1701077_nest-db-1',
      port: 3306,
      username: '1701077',
      password: '1701077',
      database: 'nest',
      entities: [UserEntity, BoardEntity, CommentEntity],
      synchronize: true,
    }),
    AuthModule,
    UserModule,
    BoardModule,
    CommentModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
