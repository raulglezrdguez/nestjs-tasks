import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    let task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
    });

    task = await this.save(task);

    if (!task) {
      throw new InternalServerErrorException(`Error creating task, try again`);
    }

    return task;
  }

  async getTasksWithFilter(tasksFilterDto: GetTaskFilterDto): Promise<Task[]> {
    const { status, search } = tasksFilterDto;
    const query = this.createQueryBuilder('task');

    if (status) {
      query.where('task.status = :status', { status });
    }

    if (search) {
      query.orWhere(
        'lower(task.title) like lower(:search) or lower(task.description) like lower(:search)',
        { search: `%${search}%` },
      );
    }

    const tasks = await query.getMany();

    return tasks;
  }

  async updateTask(task: Task, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const { title, description, status } = updateTaskDto;

    task.title = title || task.title;
    task.description = description || task.description;
    task.status = status || task.status;

    const newTask = await this.save(task);
    return newTask;
  }
}
