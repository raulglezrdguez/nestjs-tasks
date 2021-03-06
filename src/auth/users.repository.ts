import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    try {
      let user = this.create({
        username,
        password: hashPassword,
      });
      user = await this.save(user);

      if (!user) {
        throw new InternalServerErrorException(
          `Error creating user, try again`,
        );
      }
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException('Internal server error');
      }
    }
  }

  async verifyCredentials(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<boolean> {
    const { username, password } = authCredentialsDto;
    const user = await this.findOne({ username });

    if (user) {
      const match = await bcrypt.compare(password, user.password);
      if (match) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
