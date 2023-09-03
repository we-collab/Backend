import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProjectService } from 'src/project/project.service';

@Module({
  controllers: [ApplicationController],
  providers: [ApplicationService, PrismaService, ProjectService],
})
export class ApplicationModule {}
