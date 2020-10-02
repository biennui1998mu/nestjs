import { taskSchema } from './tasks.model';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Task', schema: taskSchema}])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
