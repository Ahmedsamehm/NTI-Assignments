import { User } from './user';

export interface Response_login {
  data: User;
  message: string;
  status: number;
}
