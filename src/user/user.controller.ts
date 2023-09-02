import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { GetUser } from 'src/auth/decorator/get_user.decorator';
import { User } from '@prisma/client';

@UseGuards(LocalAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('profile')
  getProfile(@GetUser() user: User) {
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    if (user.id === +id) {
      return this.userService.update(+id, updateUserDto);
    } else {
      throw new UnauthorizedException(
        'You are not allowed to update other users',
      );
    }
  }

  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    if (user.id === +id) {
      return this.userService.remove(+id);
    } else {
      throw new UnauthorizedException(
        'You are not allowed to delete other users',
      );
    }
  }
}
