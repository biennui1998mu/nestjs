import { IsNotEmpty } from 'class-validator';
import * as mongoose from 'mongoose';

export const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['OPEN', 'IN_PROGRESS', 'DONE'],
    default: 'OPEN'
  },
});

/**
 * Task is interface
 * But @IsNotEmpty() is from class-validator 
 * interface change to class
 */
export class Task extends mongoose.Document{
  id: string;

  // @IsNotEmpty({message: 'title must have some letter'})
  title: string;

  // @IsNotEmpty()
  description: string;

  status: taskStatus;
}

export enum taskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
