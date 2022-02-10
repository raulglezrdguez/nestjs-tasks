import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task-status.enum';
// import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const task = await this.tasksRepository.findOne(id);

    if (!task) {
      throw new NotFoundException(`Task with id: '${id}', not found`);
    }

    return task;
  }

  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async deleteTask(id: string): Promise<string> {
    const task = await this.getTaskById(id);
    await this.tasksRepository.remove(task);
    return id;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    let task = await this.getTaskById(id);
    task.status = status;
    task = await this.tasksRepository.save(task);

    return task;
  }

  getTasksWithFilter(filterDto: GetTaskFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasksWithFilter(filterDto);
  }

  async updateTask(id: string, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.getTaskById(id);
    return await this.tasksRepository.updateTask(task, updateTaskDto);
  }

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
  // deleteTask(id: string): string {
  //   const task = this.getTaskById(id);
  //   this.tasks = this.tasks.filter((t) => t.id !== task.id);
  //   return id;
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
