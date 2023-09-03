import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ReviewService {
  constructor(private prisma: PrismaService) {}
  async create(reviewerId: number, createReviewDto: CreateReviewDto) {
    return this.prisma.review.create({
      data: {
        reviewerId: reviewerId,
        revieweeId: createReviewDto.revieweeId,
        review: createReviewDto.review,
      },
    });
  }

  findAll(userId: number) {
    return this.prisma.review.findMany({
      where: {
        revieweeId: userId,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
  }

  update(id: number, updateReviewDto: UpdateReviewDto) {
    return this.prisma.review.update({
      where: {
        id: id,
      },
      data: {
        review: updateReviewDto.review,
      },
    });
  }

  remove(id: number) {
    return this.prisma.review.delete({
      where: {
        id: id,
      },
    });
  }
}
