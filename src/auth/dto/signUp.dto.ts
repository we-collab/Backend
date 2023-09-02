import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name;

  @IsEmail()
  @IsNotEmpty()
  email;

  @IsString()
  @IsNotEmpty()
  password;

  @IsString()
  @IsNotEmpty()
  picture;
}
