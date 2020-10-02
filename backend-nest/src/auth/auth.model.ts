import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema({
  gmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
  // status: {
  //   type: String,
  //   enum: ['ONLINE', 'OFFLINE', 'BUSY']
  // },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export interface User extends mongoose.Document {
  id: string;
  gmail: string;
  password: string;
  // status: userStatus;
}

// export enum userStatus {
//   ONLINE = 'ONLINE',
//   OFFLINE = 'OFFLINE',
//   BUSY = 'BUSY',
// }
