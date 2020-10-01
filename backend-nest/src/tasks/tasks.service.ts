import { createTask_dto } from './DTO/createTask.dto';
import { Task, taskStatus } from './tasks.model';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { stringify } from 'querystring';

@Injectable()
export class TasksService {
  constructor(@InjectModel('Task') private readonly taskModel: Model<Task>) {}

  async getAllTasks() {
    const tasks = await this.taskModel.find().exec();
    if (!tasks || tasks.length < 1) {
      throw new NotFoundException();
    }
    return tasks as Task[];
  }

  async createTask(createTask_dto: createTask_dto) {
    /**
     * DTO: data transfer object
     */
    const { title, description } = createTask_dto;

    if (!title || typeof title !== 'string' || title.length === 0) {
      throw new NotFoundException('title is empty');
    }

    if (
      !description ||
      typeof description !== 'string' ||
      description.length === 0
    ) {
      throw new NotFoundException('description is empty');
    }

    const newTask = new this.taskModel({
      title,
      description,
    });

    const saved = await newTask.save();

    if (!saved) {
      throw new NotFoundException();
    }

    return newTask as Task;
  }

  async getTask(id: string): Promise<Task> {
    const task = await this.taskModel.findById(id).exec();

    if (!task) {
      throw new NotFoundException();
    }
    return task as Task;
  }

  async updateTask(
    id: string,
    createTask_dto: createTask_dto,
    status: taskStatus,
  ): Promise<Task> {
    const task = await this.getTask(id);

    if (!task) {
      throw new NotFoundException();
    }

    const { title, description } = createTask_dto;

    if (title) {
      task.title = title;
    }

    if (description) {
      task.description = description;
    }

    if (status) {
      task.status = status;
    }

    const updated = await task.save();

    return updated as Task;
  }

  async deleteTask(id: string) {
    const task = await this.getTask(id);

    if (!task) {
      throw new NotFoundException();
    }

    const deleted = await task.remove();

    if (!deleted) {
      return 'Can not deleted task';
    }

    return 'Deleted task successfully';
  }

  async filter(status: taskStatus) {
    /**
     * TODO: filter fail
     */
    const tasks = await this.taskModel
      .find({
        status: status,
      })
      .exec();

    if (!tasks || tasks.length < 1) {
      throw new NotFoundException('array empty');
    }

    return tasks as Task[];
  }
}
