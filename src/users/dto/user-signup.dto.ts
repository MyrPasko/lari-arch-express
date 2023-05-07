import { IsEmail, IsString } from 'class-validator';

export class UserSignupDto {
  @IsEmail({}, { message: 'Email is invalid' })
  email: string;
  @IsString({ message: 'Password is absent' })
  password: string;
  @IsString({ message: 'Name is absent' })
  name: string;
}
