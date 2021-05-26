import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer, AnswerDocument } from './schemas/answer.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(Answer.name) private readonly AnswerModel: Model<AnswerDocument>,
  ) {}

  async create(createAnswerDto: CreateAnswerDto): Promise<Answer> {
    const createdAnswer = new this.AnswerModel(createAnswerDto);
    return createdAnswer.save();
  }

  async findAll(): Promise<Answer[]> {
    console.log(this.AnswerModel);
    return this.AnswerModel.find();
  }

  public async findByName(name: string): Promise<Answer> {
    return this.AnswerModel.findOne({ name });
  }

  public async findByNameAndGetReply(name: string): Promise<string> {
    const { replies } = await this.AnswerModel.findOne({ name });
    return replies[Math.floor(Math.random() * replies.length)];
  }
}
