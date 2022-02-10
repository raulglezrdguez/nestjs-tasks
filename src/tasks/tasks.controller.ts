import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get()
  // getTasks(@Query() filterDto: GetTaskFilterDto): Task[] {
  //   if (Object.keys(filterDto).length > 0) {
  //     return this.tasksService.getTasksWithFilter(filterDto);
  //   } else {
  //     return this.tasksService.getAllTasks();
  //   }
  // }

  // @Get('/:id')
  // getTaskById(@Param('id') id: string): Task {
  //   const task = this.tasksService.getTaskById(id);

  //   // if (!task) {
  //   //   throw new NotFoundException(`Task with id: ${id}, not found`);
  //   // }

  //   return task;
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

  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): string {
  //   // const task = this.tasksService.getTaskById(id);
  //   // if (!task) {
  //   //   throw new NotFoundException(`Task with id: ${id}, not found`);
  //   // }
  //   return this.tasksService.deleteTask(id);
  // }

  // @Patch('/:id/status')
  // updateTaskStatus(
  //   @Param('id') id: string,
  //   @Body() updateTaskStatusDto: UpdateTaskStatusDto,
  // ) {
  //   console.log('status:', updateTaskStatusDto);
  //   return this.tasksService.updateTaskStatus(id, updateTaskStatusDto.status);
  // }

  // @Patch('/:id')
  // updateTask(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.updateTask(id, updateTaskDto);
  // }
}
