import UsersServiceInterface from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { User } from './user.entity';
import { inject, injectable } from 'inversify';
import { TYPES } from '../types';
import ConfigServiceInterface from '../config/config.service.interface';

@injectable()
export class UsersService implements UsersServiceInterface {
  constructor(@inject(TYPES.ConfigService) private configService: ConfigServiceInterface) {}
  async createUser({ email, name, password }: UserSignupDto): Promise<User | null> {
    // check whether user exists in DB
    // if yes - return null;
    // if no - create new one.
    const newUser = new User(email, name);
    const salt = this.configService.get('SALT');

    await newUser.setPassword(password, Number(salt));

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
