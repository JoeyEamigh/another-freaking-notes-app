import { AuthType } from 'prismas';

export interface UserRegistration {
  fname: string;
  lname: string;
  authType: AuthType;
  email: string;
  password: string;
}
