import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async create(applicantId: number, projectId: number) {
    return await this.prisma.application.create({
      data: {
        applicantId: applicantId,
        projectId: projectId,
      },
    });
  }

  async findAll(projectId: number) {
    return await this.prisma.application.findMany({
      where: {
        projectId: projectId,
      },
    });
  }

  async findOne(id: number) {
    return await this.prisma.application.findUnique({
      where: {
        id: id,
      },
    });
  }

  async remove(id: number) {
    return await this.prisma.application.delete({
      where: {
        id: id,
      },
    });
  }
}
