import { createTask_dto } from './DTO/createTask.dto';
import { TasksService } from './tasks.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Task, taskStatus } from './tasks.model';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  @Post()
  // @UsePipes(ValidationPipe)
  createTask(
    // @Body('title') title: string,
    // @Body('description') description: string,
    /**
     * DTO
     */
    @Body() createTask_dto: createTask_dto
  ): Promise<Task> {
    return this.tasksService.createTask(createTask_dto);
  }

  @Get(':id')
  getTask(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTask(id);
  }

  @Patch(':id')
  updateTask(
    @Param('id') id: string,
    @Body() createTask_dto: createTask_dto,
    @Body('status') status: taskStatus,
  ) {
    return this.tasksService.updateTask(id, createTask_dto, status);
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string) {
    return this.tasksService.deleteTask(id);
  }

  @Get('filter')
  filterTask(@Body('status') status: taskStatus) {
    return this.tasksService.filter(status);
  }
}
