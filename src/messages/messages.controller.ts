import { Body, Controller, Get, Post, HttpService } from '@nestjs/common';
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
  async create(@Body() CreateMessageDto: CreateMessageDto) {
    return this.messagesService.create(CreateMessageDto);
  }
}
