import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}
  async create(currentUser: number, createProjectDto: CreateProjectDto) {
    const { title, description, price, status } = createProjectDto;

    return await this.prisma.project.create({
      data: {
        title,
        description,
        price,
        status,
        creator: { connect: { id: currentUser } },
      },
    });
  }

  async findAll() {
    return await this.prisma.project.findMany();
  }

  async findOne(id: number) {
    return await this.prisma.project.findUnique({
      where: {
        id: id,
      },
    });
  }

  async findCompletedProjects(currentUser: number) {
    return await this.prisma.project.findMany({
      where: {
        assignedUserId: currentUser,
        status: 'COMPLETED',
      },
    });
  }

  async findActiveProjects(currentUser: number) {
    return await this.prisma.project.findMany({
      where: {
        assignedUserId: currentUser,
        status: 'ACTIVE',
      },
    });
  }

  async findInActiveProjects(currentUser: number) {
    return await this.prisma.project.findMany({
      where: {
        assignedUserId: currentUser,
        status: 'INACTIVE',
      },
    });
  }

  async findMyProjects(currentUser: number) {
    return await this.prisma.project.findMany({
      where: {
        creatorId: currentUser,
      },
    });
  }

  async findAssignedProjects(currentUser: number) {
    return await this.prisma.project.findMany({
      where: {
        assignedUserId: currentUser,
      },
    });
  }

  async activate(currentUser: number, id: number) {
    const project = await this.findOne(id);
    if (project && project.assignedUserId === currentUser) {
      return this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          status: 'ACTIVE',
        },
      });
    } else if (project && project.assignedUserId !== currentUser) {
      throw new ForbiddenException(
        'You are not allowed to activate other users  project',
      );
    } else {
      throw new ForbiddenException('Project not found');
    }
  }

  async deactivate(currentUser: number, id: number) {
    const project = await this.findOne(id);
    if (project && project.assignedUserId === currentUser) {
      return this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          status: 'INACTIVE',
        },
      });
    } else if (project && project.assignedUserId !== currentUser) {
      throw new ForbiddenException(
        'You are not allowed to deactivate other users  project',
      );
    } else {
      throw new ForbiddenException('Project not found');
    }
  }

  async assign(currentUser: number, id: number, assignedTo: number) {
    const project = await this.findOne(id);
    if (project && project.creatorId === currentUser) {
      if (assignedTo !== currentUser) {
        try {
          return await this.prisma.project.update({
            where: {
              id: id,
            },
            data: {
              assignedUserId: assignedTo,
            },
          });
        } catch (err) {
          throw new BadRequestException("User doesn't exist");
        }
      } else {
        throw new ForbiddenException(
          'You are not allowed to assign yourself  project',
        );
      }
    } else if (project && project.creatorId !== currentUser) {
      throw new ForbiddenException(
        'You are not allowed to assign other users  project',
      );
    } else {
      throw new ForbiddenException('Project not found');
    }
  }

  async unassign(currentUser: number, id: number) {
    const project = await this.findOne(id);
    if (project && project.creatorId === currentUser) {
      return this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          assignedUserId: null,
        },
      });
    } else if (project && project.creatorId !== currentUser) {
      throw new ForbiddenException(
        'You are not allowed to unassign other users  project',
      );
    } else {
      throw new ForbiddenException('Project not found');
    }
  }

  async complete(currentUser: number, id: number) {
    const project = await this.findOne(id);
    if (project && project.assignedUserId === currentUser) {
      return this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          status: 'COMPLETED',
        },
      });
    } else if (project && project.assignedUserId !== currentUser) {
      throw new ForbiddenException(
        'You are not allowed to complete other users  project',
      );
    } else {
      throw new ForbiddenException('Project not found');
    }
  }

  async update(
    currentUser: number,
    id: number,
    updateProjectDto: UpdateProjectDto,
  ) {
    const product = await this.findOne(id);

    if (product && product.creatorId === currentUser) {
      return this.prisma.project.update({
        where: {
          id: id,
        },
        data: {
          ...updateProjectDto,
        },
      });
    } else if (product && product.creatorId !== currentUser) {
      throw new ForbiddenException(
        'You are not allowed to update other users  project',
      );
    } else {
      throw new ForbiddenException('Project not found');
    }
  }

  async remove(currentUser: number, id: number) {
    const product = await this.findOne(id);
    if (product && product.creatorId === currentUser) {
      return this.prisma.project.delete({
        where: {
          id: id,
        },
      });
    } else if (product && product.creatorId !== currentUser) {
      throw new ForbiddenException(
        'You are not allowed to Delete other users  Project',
      );
    } else {
      throw new ForbiddenException('Project not found');
    }
  }
}
