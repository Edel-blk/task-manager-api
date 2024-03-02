import { TasksStatus } from '../tasks/tasks.entity';
import { IsIn, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  staus?: TasksStatus;
}

export class UpdateTaskDTO {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  @IsIn([TasksStatus.DONE, TasksStatus.IN_PROGRESS, TasksStatus.PENDING])
  status?: TasksStatus;
}
