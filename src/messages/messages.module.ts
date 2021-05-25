import { Module, HttpModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnswersService } from 'src/answers/answers.service';
import { MessagesController } from './messages.controller';
import { MessagesService } from './messages.service';
import { Message, MessageSchema } from './schemas/message.schema';
import { Answer, AnswerSchema } from '../answers/schemas/answer.schema';
import { UltimateService } from './ultimate.service';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([
      { name: Message.name, schema: MessageSchema },
      { name: Answer.name, schema: AnswerSchema }
    ])],
  controllers: [MessagesController],
  providers: [MessagesService, UltimateService, AnswersService],
})
export class MessagesModule {}
