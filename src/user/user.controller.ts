import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UnauthorizedException,
  UploadedFile,
  UseInterceptors,
  Res,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { LocalAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { GetUser } from 'src/auth/decorator/get_user.decorator';
import { User } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @UseGuards(LocalAuthGuard)
  @Get('profile')
  getProfile(@GetUser() user: User) {
    return user;
  }
  @UseGuards(LocalAuthGuard)
  @Get()
  findAll() {
    return this.userService.findAll();
  }
  @UseGuards(LocalAuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }
  @UseGuards(LocalAuthGuard)
  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          const fileExtension = file.originalname.split('.')[1];
          const newFileName =
            name.split(' ').join('_') + '_' + Date.now() + '.' + fileExtension;

          cb(null, newFileName);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpeg|jpg|png|gif)$/)) {
          return cb(null, false);
        }
        cb(null, true);
      },
    }),
  )
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
    @UploadedFile('file') file: Express.Multer.File,
  ) {
    if (user.id === +id) {
      if (!file) {
        return this.userService.update(+id, updateUserDto);
      } else {
        const filePathURL = `http://localhost:3000/user/profile/picutres/${file.filename}`;
        updateUserDto.picture = filePathURL;
        return this.userService.update(+id, updateUserDto);
      }
    } else {
      throw new UnauthorizedException(
        'You are not allowed to update other users',
      );
    }
  }

  @Get('profile/picutres/:imgpath')
  async seeUploadedFile(
    @Param('imgpath') image,
    @GetUser() user: User,
    @Res() res,
  ) {
    return await res.sendFile(image, { root: './uploads' });
  }

  @UseGuards(LocalAuthGuard)
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
