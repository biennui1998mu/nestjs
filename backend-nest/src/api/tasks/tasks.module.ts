import { taskSchema } from './tasks.model';
import { MongooseModule } from 'src/api/auth/node_modules/@nestjs/mongoose';
import { Module } from 'src/api/auth/node_modules/@nestjs/common';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';

@Module({
  imports: [MongooseModule.forFeature([{name: 'Task', schema: taskSchema}])],
  controllers: [TasksController],
  providers: [TasksService]
})
export class TasksModule {}
