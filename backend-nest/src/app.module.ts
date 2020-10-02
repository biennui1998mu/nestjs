import { Module } from 'src/api/auth/node_modules/@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from 'src/api/auth/node_modules/@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './api/auth/auth.module';

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
