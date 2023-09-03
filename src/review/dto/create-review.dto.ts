import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  review;

  @IsInt()
  @IsNotEmpty()
  revieweeId;
}
