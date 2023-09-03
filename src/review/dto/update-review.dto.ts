import { IsOptional, IsString } from 'class-validator';

export class UpdateReviewDto {
  @IsString()
  @IsOptional()
  review;
}
