import { ProjectStatus } from '@prisma/client';
import { IsString, IsInt, IsEnum, IsOptional } from 'class-validator';

export class UpdateProjectDto {
  @IsString()
  @IsOptional()
  title;
  @IsString()
  @IsOptional()
  description;
  @IsInt()
  @IsOptional()
  price;
  @IsEnum(ProjectStatus)
  @IsOptional()
  status;
}
