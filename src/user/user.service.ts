import { ForbiddenException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findOne(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (user) {
      delete user.password;
      return user;
    } else {
      throw new ForbiddenException('User not found');
    }
  }

  async update(userId: number, updateUserDto: UpdateUserDto) {
    const foundUser = this.findOne(userId);
    if (foundUser) {
      const user = await this.prisma.user.update({
        where: {
          id: userId,
        },

        data: {
          ...updateUserDto,
        },
      });

      return user;
    } else {
      throw new ForbiddenException('User not found');
    }
  }

  async remove(userId: number) {
    const foundUser = this.findOne(userId);
    if (foundUser) {
      return await this.prisma.user.delete({
        where: {
          id: userId,
        },
      });
    } else {
      throw new ForbiddenException('User not found');
    }
  }
}
