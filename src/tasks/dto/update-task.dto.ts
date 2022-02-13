import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsOptional } from 'class-validator';
import { TaskStatus } from '../task-status.enum';

export class UpdateTaskDto {
  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  description?: string;

  @ApiProperty()
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
