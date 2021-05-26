import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as request from 'supertest';

import { MessagesController } from '../src/messages/messages.controller';
import { MessagesService } from '../src/messages/messages.service';

const mockedMessage = {
  botId: '1234567',
  message: "Hello",
}

const MockMessageService = {
  create: (obj) => Object.assign(obj, {
    reply: 'Mocked Reply',
    intent: 'Mocked Intent',
    _id: new mongoose.Types.ObjectId(),
  }),

}

describe('AnswersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [MessagesController],
      providers: [
        {
          provide: MessagesService,
          useFactory: () => (MockMessageService),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/messages (POST)', done => {
    return request(app.getHttpServer())
      .post('/messages')
      .send(mockedMessage)
      .end((error, response) => {
        const { body } = response;
        expect(response.status).toBe(201);
        expect(body.botId).toEqual('1234567');
        expect(body.message).toEqual('Hello');
        expect(body.intent).toEqual('Mocked Intent');
        expect(body.reply).toEqual('Mocked Reply');
        expect(mongoose.isValidObjectId(body._id)).toBe(true);
        done();
      });
  });
});
