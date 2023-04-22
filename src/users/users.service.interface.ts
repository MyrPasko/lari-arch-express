import { UserSignupDto } from './dto/user-signup.dto';
import { User } from './user.entity';
import { UserLoginDto } from './dto/user-login.dto';

export default interface UsersServiceInterface {
  createUser: (dto: UserSignupDto) => Promise<User | null>;
  validateUser: (dto: UserLoginDto) => Promise<boolean>;
}
