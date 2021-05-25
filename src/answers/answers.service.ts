import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer, AnswerDocument } from './schemas/answer.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private readonly answerModel: Model<AnswerDocument>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const createdAnswer = new this.answerModel(createAnswerDto);
    return createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    return this.answerModel.find().exec();
  }

  public async findByName(name: string): Promise<Answer> {
    return this.answerModel.findOne({ name }).exec();
  }

  public async findByNameAndGetReply(name: string): Promise<string> {
    const { replies } = await this.answerModel.findOne({ name }).exec();
    return replies[Math.floor(Math.random() * replies.length)];
  }
}
