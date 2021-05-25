import { Body, Controller, Get, Post, Res, NotFoundException, HttpStatus, Param } from '@nestjs/common';
import { Response } from 'express';
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
  async create(@Body() CreateAnswerDto: CreateAnswerDto, @Res() res: Response) {
    const answer = await this.answersService.create(CreateAnswerDto);
    return res.status(HttpStatus.CREATED).send(answer);
  }

  @Get()
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.'})
  async findAll(@Res() res: Response) {
    const answers = await this.answersService.findAll();
    return res.status(HttpStatus.OK).send(answers);
  }

  @Get('/:name')
  @ApiResponse({ status: 200, description: 'The response has been successfully retrieved.' })
  @ApiResponse({ status: 404, description: 'The response has not been found' })
  async findByName(@Param('name') name: string, @Res() res: Response) {
    const answer = await this.answersService.findByName(name);
    if (!answer) {
      return res.status(HttpStatus.NOT_FOUND).send();
    }
    return res.status(HttpStatus.OK).send(answer);
  }
}

