import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { AuthCrentialsDto } from './dto/auth-credentials.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async createUser(authCredentialsDto: AuthCrentialsDto): Promise<void> {
    const { username, password } = authCredentialsDto;

    const user = this.create({ username, password });

    try {
      await this.save(user);
    } catch (error) {
      if (error.code === '23505') {
        //duplicate username
        throw new ConflictException("Nom d'utilisateur déja utilisé");
      } else {
        throw new InternalServerErrorException();
      }
      // console.log(`error =>`, error.code);
    }
  }
}
