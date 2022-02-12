import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { threadId } from 'worker_threads';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { JwtPayload } from './jwt-payload.interface';
import { JwtToken } from './jwt-token.interface';
import { UsersRepository } from './users.repository';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository)
    private usersRepository: UsersRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    await this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(authCredentialsDto: AuthCredentialsDto): Promise<JwtToken> {
    const validUser = await this.usersRepository.verifyCredentials(
      authCredentialsDto,
    );

    if (validUser) {
      const { username } = authCredentialsDto;
      const payload: JwtPayload = { username };
      const token = await this.jwtService.signAsync(payload);
      return { token };
    } else {
      throw new UnauthorizedException('Please check your credentials');
    }
  }
}
