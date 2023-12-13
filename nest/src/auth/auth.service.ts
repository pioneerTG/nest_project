import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async signUp(name: string, email: string, password: string): Promise<string> {
    const existingUser = await this.userRepository.findOneBy({ email });

    if (existingUser) {
      throw new ConflictException('이메일을 확인해 주세요');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    console.log('회원가입완료');

    return this.jwtService.sign({ userId: newUser.id });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOneBy({ email });

    if (!user) {
      throw new NotFoundException(
        '존재하지 않는 유저이거나 비밀번호를 확인해주세요',
      );
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        '존재하지 않는 유저이거나 비밀번호를 확인해주세요',
      );
    }
    console.log('로그인완료');
    return this.jwtService.sign({ userId: user.id, name: user.name });
  }
}
