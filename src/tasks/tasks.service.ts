import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Task } from 'src/schemas/task.schema';
import { Model } from 'mongoose';
import { CreateTaskDTO, UpdateTaskDTO } from '../dto/task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  getAllTasks(id: string) {
    console.log(id);
    return this.taskModel.find({ userID: id });
  }

  async createTask(createTask: CreateTaskDTO) {
    console.log(createTask);
    const newTask = new this.taskModel(createTask);
    await newTask.save();
    return newTask;
  }

  deteleteTask(id: string) {
    return this.taskModel.findByIdAndDelete(id);
  }

  updateTask(id: string, task: UpdateTaskDTO) {
    return this.taskModel.findByIdAndUpdate(id, task, { new: true });
  }
}
