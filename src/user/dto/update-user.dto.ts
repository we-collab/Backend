import {
  IsBoolean,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
export class UpdateUserDto {
  @IsString()
  @IsOptional()
  id: number;

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  picture: string;

  @IsString()
  @IsOptional()
  pitch?: string | null;

  @IsString()
  @IsOptional()
  about?: string | null;

  @IsString()
  @IsOptional()
  experience?: string | null;

  @IsBoolean()
  @IsOptional()
  availability: boolean;

  @IsNumber()
  @IsOptional()
  money: number;
}
