import {
  IsNotEmpty,
  IsString,
  IsInt,
  IsEnum,
  IsOptional,
} from 'class-validator';

enum ProjectStatus {
  ACTIVE = 'NotStarted',
  INACTIVE = 'InProgress',
  Completed = 'Completed',
}
export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  title;
  @IsString()
  @IsNotEmpty()
  description;
  @IsInt()
  @IsNotEmpty()
  price;
  @IsEnum(ProjectStatus)
  @IsOptional()
  status;
}

// Define your project status enum values here
