import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTaskById(id: string): Task {
  //   const task = this.tasks.find((t) => t.id === id);
  //   if (!task) {
  //     throw new NotFoundException(`Task with id: ${id}, not found`);
  //   }
  //   return task;
  // }
  // getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((t) => t.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(
  //       (t) => t.title.includes(search) || t.description.includes(search),
  //     );
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // deleteTask(id: string): string {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((t) => t.id !== task.id);
  //   return id;
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // updateTask(id: string, updateTaskDto: UpdateTaskDto): Task {
  //   const task = this.getTaskById(id);
  //   if (updateTaskDto.title) {
  //     task.title = updateTaskDto.title;
  //   }
  //   if (updateTaskDto.description) {
  //     task.description = updateTaskDto.description;
  //   }
  //   if (updateTaskDto.status) {
  //     task.status = updateTaskDto.status;
  //   }
  //   return task;
  // }
}
