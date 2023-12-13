import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateCommentDto {
  @IsString()
  @IsNotEmpty()
  readonly userName: string;

  @IsNumber()
  @IsNotEmpty()
  readonly boardId: number;

  @IsString()
  @IsNotEmpty()
  readonly comment: string;
}
