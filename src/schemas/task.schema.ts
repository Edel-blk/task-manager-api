import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { TasksStatus } from 'src/tasks/tasks.entity';

@Schema({
  timestamps: true,
})
export class Task {
  @Prop({
    unique: true,
    required: true,
    trim: true,
  })
  title: string;

  @Prop({
    trim: true,
  })
  description: string;

  @Prop({
    default: TasksStatus.PENDING,
  })
  status: TasksStatus;
}

export const TaskSchema = SchemaFactory.createForClass(Task);
