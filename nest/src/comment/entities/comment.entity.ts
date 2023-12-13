import { BoardEntity } from 'src/board/entities/board.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('Comment')
export class CommentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userName: string;

  @Column()
  boardId: number;

  @Column()
  comment: string;

  @ManyToOne(() => BoardEntity, (board) => board.comments, {
    onDelete: 'CASCADE',
  })
  board: BoardEntity;

  @ManyToOne(() => UserEntity, (user) => user.comments)
  user: UserEntity;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
