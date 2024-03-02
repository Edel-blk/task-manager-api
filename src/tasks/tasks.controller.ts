import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Param,
  ConflictException,
  NotFoundException,
  HttpCode,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks() {
    return this.tasksService.getAllTasks();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const task = await this.tasksService.findOne(id);

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  @Post()
  async createTask(@Body() newTask: CreateTaskDTO) {
    try {
      return await this.tasksService.createTask(newTask);
    } catch (error) {
      if (error.code === 11000) {
        throw new ConflictException('Task Already Exist');
      }

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  async deleteTask(@Param('id') id: string) {
    const task = await this.tasksService.deteleteTask(id);

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: string,
    @Body() updatedFields: UpdateTaskDTO,
  ) {
    const task = await this.tasksService.updateTask(id, updatedFields);

    if (!task) throw new NotFoundException('Task not found');

    return task;
  }
}
