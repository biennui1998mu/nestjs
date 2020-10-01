import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TasksModule } from './tasks/tasks.module';
import { AuthModule } from './auth/auth.module';

const username = 'biennui198mu';
const password = 'mu0309198';
const dbName = 'nestjs';

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
