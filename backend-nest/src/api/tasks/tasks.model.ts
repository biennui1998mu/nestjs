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
export interface Task extends mongoose.Document{
  id: string;
  title: string;
  description: string;
  status: taskStatus;
}

export enum taskStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
}
