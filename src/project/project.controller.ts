import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';
import { LocalAuthGuard } from 'src/auth/guard/jwtAuth.guard';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator/get_user.decorator';

@UseGuards(LocalAuthGuard)
@Controller('project')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post()
  create(@GetUser() user: User, @Body() createProjectDto: CreateProjectDto) {
    return this.projectService.create(user.id, createProjectDto);
  }

  @Get()
  findAll() {
    return this.projectService.findAll();
  }

  // to get projects I created
  @Get('myProjects')
  findMyProjects(@GetUser() user: User) {
    return this.projectService.findMyProjects(user.id);
  }

  // to get projects current user has been assigned to
  @Get('AssignedProjects')
  findAssignedProjects(@GetUser() user: User) {
    return this.projectService.findAssignedProjects(user.id);
  }
  // to get projects current user has completed
  @Get('completed')
  findCompletedProjects(@GetUser() user: User) {
    return this.projectService.findCompletedProjects(user.id);
  }

  // to get active projects of a current user
  @Get('active')
  findActiveProjects(@GetUser() user: User) {
    return this.projectService.findActiveProjects(user.id);
  }

  //to get in active projects of the current user
  @Get('inActive')
  findInActiveProjects(@GetUser() user: User) {
    return this.projectService.findInActiveProjects(user.id);
  }

  // to activate an inactive project
  @Patch('activate/:id')
  activate(@GetUser() user: User, @Param('id') id: string) {
    return this.projectService.activate(user.id, +id);
  }

  @Patch('deactivate/:id')
  deactivate(@GetUser() user: User, @Param('id') id: string) {
    return this.projectService.deactivate(user.id, +id);
  }

  // to deactivate an active project
  @Patch('complete/:id')
  complete(@GetUser() user: User, @Param('id') id: string) {
    return this.projectService.complete(user.id, +id);
  }

  // to assign a project to a user
  @Patch('assign/:id')
  assign(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() assignedTo: string,
  ) {
    console.log(assignedTo['assignedTo']);
    return this.projectService.assign(
      user.id,
      Int.parse(id),
      +assignedTo['assignedTo'],
    );
  }

  // to unassign a project from a user
  @Patch('unassign/:id')
  unassign(@GetUser() user: User, @Param('id') id: string) {
    return this.projectService.unassign(user.id, +id);
  }

  // to update the contents of a project
  @Patch(':id')
  update(
    @GetUser() user: User,
    @Param('id') id: string,
    @Body() updateProjectDto: UpdateProjectDto,
  ) {
    const currentUser = user.id;
    return this.projectService.update(currentUser, +id, updateProjectDto);
  }

  //to delete a project
  @Delete(':id')
  remove(@GetUser() user: User, @Param('id') id: string) {
    return this.projectService.remove(user.id, +id);
  }

  // to get a specific project by id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.projectService.findOne(+id);
  }
}
