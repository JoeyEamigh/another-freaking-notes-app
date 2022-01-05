import { AuthType } from 'prismas';
import { IsEmail, IsNotEmpty, Equals } from 'class-validator';

export class UserRegistration {
  @Equals('LOCAL')
  authType: AuthType;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;
}
