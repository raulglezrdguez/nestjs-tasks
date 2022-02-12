import { InternalServerErrorException } from '@nestjs/common';
import { User } from 'src/auth/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-tasks-filter.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TaskStatus } from './task-status.enum';
import { Task } from './task.entity';

@EntityRepository(Task)
export class TasksRepository extends Repository<Task> {
  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;
    let task = this.create({
      title,
      description,
      status: TaskStatus.OPEN,
      user,
    });

    task = await this.save(task);

    if (!task) {
      throw new InternalServerErrorException(`Error creating task, try again`);
    }

    return task;
  }

  async getTasksWithFilter(
    tasksFilterDto: GetTaskFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = tasksFilterDto;
    const query = this.createQueryBuilder('task');

    query.where({ user });

    if (status) {
      query.andWhere('task.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(lower(task.title) like lower(:search) or lower(task.description) like lower(:search))',
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
