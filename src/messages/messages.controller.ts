import { Body, Controller, Res, Post, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(
    private readonly messagesService: MessagesService,
  ) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  async create(@Body() CreateMessageDto: CreateMessageDto, @Res() res: Response) {
    const message =  await this.messagesService.create(CreateMessageDto);
    return res.status(HttpStatus.CREATED).send(message);
  }
}
