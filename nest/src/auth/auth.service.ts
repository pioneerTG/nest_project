import { ConflictException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
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
    const existingUser = await this.userRepository.findOne({ where: { email } });

    if (existingUser) {
      throw new ConflictException('이메일을 확인해주세요');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });
    await this.userRepository.save(newUser);

    return this.jwtService.sign({ userId: newUser.id });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userRepository.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new NotFoundException('존재하지 않는 유저이거나, 비밀번호가 잘못되었습니다.');
    }

    return this.jwtService.sign({ userId: user.id, name: user.name });
  }
}