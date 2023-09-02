import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  password;
}
