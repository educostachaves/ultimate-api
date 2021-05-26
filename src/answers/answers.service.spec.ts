import { AnswersService } from '../answers/answers.service';
import { getModelToken } from '@nestjs/mongoose';
import { Test } from '@nestjs/testing';
import { Answer } from './schemas/answer.schema';

const mockedAnswer = {
  replies: [
    "Sorry about that. How can I help you?",
    "It's looks like a reclamation, so how can I help you?"
  ],
  _id: "60ab12c72c29d100a7e5a705",
  name: "Reclamation",
}

class MockAnswerModel {
  obj: any;
  constructor(obj) {
    this.obj = obj
  }
  save() { return this.obj; }
  static find() { return [ mockedAnswer ]; }
  static findOne() { return mockedAnswer; }
}

describe('AnswersService', () => {
  let answersService: AnswersService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        AnswersService,
        { provide: getModelToken(Answer.name), useValue: MockAnswerModel },
      ],
    }).compile();

    answersService = module.get<AnswersService>(AnswersService);
  });

  describe('when try to create a new answer', () => {
    it('should return a success object as response', async () => {
      const result = await answersService.create(mockedAnswer);
      expect(result.name).toBe('Reclamation');
      expect(result.replies.length).toBe(2);
    });
  });

  describe('when try to findAll answers', () => {
    it('should return a success object as response', async () => {
      const result = await answersService.findAll();
      expect(result.length).toBe(1);
      expect(result[0].name).toBe('Reclamation');
      expect(result[0].replies.length).toBe(2);
    });
  });

  describe('when try to findByName a answers', () => {
    it('should return a success object as response', async () => {
      const result = await answersService.findByName('mockedName');
      expect(result.name).toBe('Reclamation');
      expect(result.replies.length).toBe(2);
    });
  });

  describe('when try to findByNameAndGetReply a answers', () => {
    it('should return a success object as response', async () => {
      const result = await answersService.findByNameAndGetReply('mockedName');
      expect(result).toEqual(mockedAnswer.replies.find(r => r === result));
    });
  });
});
