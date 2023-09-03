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

  async findAll(userId: number) {
    return await this.prisma.review.findMany({
      where: {
        revieweeId: userId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.review.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: number, updateReviewDto: UpdateReviewDto) {
    return await this.prisma.review.update({
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
