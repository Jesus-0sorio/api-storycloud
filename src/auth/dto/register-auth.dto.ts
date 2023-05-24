import { IsEmpty, IsString } from 'class-validator';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends LoginAuthDto {
  @IsEmpty()
  @IsString()
  name: string;
  @IsEmpty()
  @IsString()
  username: string;
}
