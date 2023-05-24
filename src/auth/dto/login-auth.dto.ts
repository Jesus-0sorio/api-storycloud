import { IsEmail, IsEmpty, MinLength } from 'class-validator';

export class LoginAuthDto {
  @IsEmail()
  @IsEmpty()
  email: string;
  @IsEmpty()
  @MinLength(4)
  password: string;
}
