import { InternalServerErrorException } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
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
}
