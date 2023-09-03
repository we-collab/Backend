import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { LocalAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { GetUser } from 'src/auth/decorator/get_user.decorator';
import { User } from '@prisma/client';

@UseGuards(LocalAuthGuard)
@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @Post(':id')
  apply(@GetUser() user: User, @Param('id') projectId: string) {
    return this.applicationService.create(user.id, +projectId);
  }

  @Get(':id')
  findAll(@Param('id') projectId: string) {
    return this.applicationService.findAll(+projectId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.applicationService.remove(+id);
  }
}
