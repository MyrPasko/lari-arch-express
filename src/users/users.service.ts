import UsersServiceInterface from './users.service.interface';
import { UserLoginDto } from './dto/user-login.dto';
import { UserSignupDto } from './dto/user-signup.dto';
import { User } from './user.entity';
import { injectable } from 'inversify';

@injectable()
export class UsersService implements UsersServiceInterface {
  async createUser({ email, name, password }: UserSignupDto): Promise<User | null> {
    // check whether user exists in DB
    // if yes - return null;
    // if no - create new one.
    const newUser = new User(email, name);

    await newUser.setPassword(password);

    return null;
  }

  async validateUser(dto: UserLoginDto): Promise<boolean> {
    return true;
  }
}
