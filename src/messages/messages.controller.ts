import { Body, Controller, Get, Post } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './schemas/message.schema';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('messages')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  @Post()
  @ApiResponse({ status: 201, description: 'The record has been successfully created.'})
  @ApiResponse({ status: 403, description: 'Forbidden.'})
  async create(@Body() CreateMessageDto: CreateMessageDto) {
    this.messagesService.create(CreateMessageDto);
  }

  @Get()
  async findAll(): Promise<Message[]> {
    return this.messagesService.findAll();
  }
}
