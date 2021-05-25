import { Injectable, HttpService } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnswersService } from 'src/answers/answers.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message, MessageDocument } from './schemas/message.schema';
import { UltimateService } from './ultimate.service';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel(Message.name) private readonly messageModel: Model<MessageDocument>,
    private ultimateService: UltimateService,
    private answerService: AnswersService,
  ) {}

  async create(createMessageDto: CreateMessageDto) {
    const intent: string = await this.ultimateService.getIntents(createMessageDto.message);
    const reply: string = await this.answerService.findByNameAndGetReply(intent);
    const createdMessage = new this.messageModel(
      Object.assign(createMessageDto, { reply, intent }));
    return createdMessage.save();
  }
}
