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

  public async findOne(answerId: string): Promise<Answer> {
    const answer = await this.answerModel
      .findById({ _id: answerId })
      .exec();

    if (!answer) {
      throw new NotFoundException(`Answer #${answer} not found`);
    }

    return answer;
  }
}
