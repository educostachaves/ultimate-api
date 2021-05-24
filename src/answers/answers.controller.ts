import { Body, Controller, Get, Post, Res, NotFoundException, HttpStatus, Param } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { Answer } from './schemas/answer.schema';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('answers')
@Controller('answers')
export class AnswersController {
  constructor(private readonly answersService: AnswersService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  async create(@Body() CreateAnswerDto: CreateAnswerDto) {
    this.answersService.create(CreateAnswerDto);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  async findAll(): Promise<Answer[]> {
    return this.answersService.findAll();
  }

  @Get('/:id')
  public async getCustomer(@Res() res, @Param('id') customerId: string) {
    const customer = await this.answersService.findOne(customerId);
    if (!customer) {
      throw new NotFoundException('Customer does not exist!');
    }
    return res.status(HttpStatus.OK).json(customer);
  }
}
