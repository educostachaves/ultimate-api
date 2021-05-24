import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessagesModule } from './messages/messages.module';
import { AnswersModule } from './answers/answers.module';

const {
  MONGO_HOST: mongoHost,
  MONGO_PORT: mongoPort,
  MONGO_DB: mongoDatabase,
  MONGO_USER: mongoUser,
  MONGO_PASSWORD: mongoPassword,
} = process.env;

@Module({
  imports: [
    MongooseModule.forRoot(
      `mongodb://${mongoUser}:${mongoPassword}@${mongoHost}:${mongoPort}/${mongoDatabase}?authSource=admin`,
    ),
    MessagesModule,
    AnswersModule,
  ],
})
export class AppModule {}
