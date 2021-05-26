import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as mongoose from 'mongoose';
import * as request from 'supertest';

import { AnswersController } from '../src/answers/answers.controller';
import { AnswersService } from '../src/answers/answers.service';

const mockedAnswer = {
  replies: [
    "Sorry about that. How can I help you?",
    "It's looks like a reclamation, so how can I help you?"
  ],
  _id: "60ab12c72c29d100a7e5a705",
  name: "Reclamation",
}

const MockAnswerService = {
  create: (obj) => Object.assign(obj, { _id: new mongoose.Types.ObjectId()}),
  findAll: () => [ mockedAnswer ],
  findByName: () => mockedAnswer,
}

describe('AnswersController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      controllers: [AnswersController],
      providers: [
        {
          provide: AnswersService,
          useFactory: () => (MockAnswerService),
        },
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/answers (GET)', () => {
    return request(app.getHttpServer())
      .get('/answers')
      .expect(200)
      .expect([mockedAnswer]);
  });

  it('/answers/:name (GET)', () => {
    const nameQuery = 'Reclamation';
    return request(app.getHttpServer())
      .get(`/answers/${nameQuery}`)
      .expect(200)
      .expect(mockedAnswer);
  });

  it('/answers (POST)', done => {
    return request(app.getHttpServer())
      .post('/answers')
      .send({
        replies: [
          "Sorry about that. How can I help you?",
          "It's looks like a reclamation, so how can I help you?"
        ],
        name: "Reclamation",
      })
      .end((error, response) => {
        const { body } = response;
        expect(response.status).toBe(201);
        expect(body.name).toEqual('Reclamation');
        expect(body.replies.length).toBe(2);
        expect(mongoose.isValidObjectId(body._id)).toBe(true);
        done();
      });
  });
});
