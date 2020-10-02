import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './api/auth/auth.module';
import { TasksModule } from './api/tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';

const username = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;

@Module({
  imports: [
    TasksModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${username}:${password}@nosama.dstgw.gcp.mongodb.net/${dbName}?retryWrites=true&w=majority`,
    ),
    AuthModule,
  ],
})
export class AppModule {}
