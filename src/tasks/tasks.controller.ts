import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './task.entity';
import { TasksService } from './tasks.service';

@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/:id')
  async getTaskById(
    @Param('id') id: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.getTaskById(id, user);
  }

  @Post()
  createTask(
    @Body() createTaskDto: CreateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.createTask(createTaskDto, user);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string, @GetUser() user: User): Promise<string> {
    return this.tasksService.deleteTask(id, user);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body() updateTaskStatusDto: UpdateTaskStatusDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTaskStatus(
      id,
      updateTaskStatusDto.status,
      user,
    );
  }

  @Get()
  getTasks(
    @Query() tasksFilterDto: GetTaskFilterDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return this.tasksService.getTasksWithFilter(tasksFilterDto, user);
  }

  @Patch('/:id')
  updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
    @GetUser() user: User,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto, user);
  }
  // @Patch('/:id')
  // updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length > 0) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ) {
  //   console.log('status:', updateTaskStatusDto);
  //   return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  // }

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): string {
  //   // const task = this.tasksService.getTaskById(id);
  //   // if (!task) {
  //   //   throw new NotFoundException(`Task with id: ${id}, not found`);
  //   // }
  //   return this.tasksService.deleteTask(id);
  // }

  // //   @Post()
  // //   createTask(@Body() body): string {
  // //     console.log(body);

  // //     return 'create task works';
  // //   }
  // //   @Post()
  // //   createTask(
  // //     @Body('title') title: string,
  // //     @Body('description') description: string,
  // //   ): Task {
  // //     return this.tasksService.createTask(title, description);
  // //   }
  // @Post()
  // createTask(@Body() createTaskDto: CreateTaskDto): Task {
  //   return this.tasksService.createTask(createTaskDto);
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   const task = this.tasksService.getTaskById(id);

  //   // if (!task) {
  //   //   throw new NotFoundException(`Task with id: ${id}, not found`);
  //   // }

  //   return task;
  // }
}
