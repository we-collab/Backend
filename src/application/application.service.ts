import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';

@Injectable()
export class ApplicationService {
  constructor(
    private prisma: PrismaService,
    private projectService: ProjectService,
  ) {}

  async create(applicantId: number, projectId: number) {
    const project = await this.projectService.findOne(projectId);
    if (project) {
      return await this.prisma.application.create({
        data: {
          applicantId: applicantId,
          projectId: projectId,
        },
      });
    } else {
      throw new NotFoundException('Project not found');
    }
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
