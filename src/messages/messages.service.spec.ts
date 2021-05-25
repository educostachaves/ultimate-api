import { UltimateService } from './ultimate.service';
import { MessagesService } from './messages.service';
import { AnswersService } from '../answers/answers.service';
import { HttpModule, } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Message } from './schemas/message.schema';

class MockAnswerModel {
  obj: any;
  constructor(obj) {
    this.obj = obj
  }
  save() { return this.obj; }
}

describe('MessagesService', () => {
  let ultimateService: UltimateService;
  let messagesService: MessagesService;
  let answersService: AnswersService;
  let messageModel;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        MessagesService,
        { provide: UltimateService, useValue: jest.fn() },
        { provide: AnswersService, useValue: jest.fn() },
        { provide: getModelToken(Message.name), useValue: MockAnswerModel },
      ],
      imports: [ HttpModule ],
    }).compile();

    ultimateService = module.get<UltimateService>(UltimateService);
    messagesService = module.get<MessagesService>(MessagesService);
    answersService = module.get<AnswersService>(AnswersService);
  });

  describe('when try to create a new message', () => {
    it('should return a right message response', async () => {
      const messageMock = {
        botId: '123456',
        message: 'Mocked Message',
      };

      ultimateService.getIntents = jest.fn().mockResolvedValue('Random Intent');
      answersService.findByNameAndGetReply = jest.fn().mockResolvedValue('Random Reply');

      const result = await messagesService.create(messageMock);

      expect(result.reply).toBe('Random Reply');
      expect(result.intent).toBe('Random Intent');
    });
  })
});
