import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';

//6Wz2y8UscGlA5o80

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://taskmanager:6Wz2y8UscGlA5o80@tasks.lnzv8xd.mongodb.net/?retryWrites=true&w=majority&appName=Tasks',
    ),
    TasksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
