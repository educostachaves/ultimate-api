import { UltimateService } from './ultimate.service';
import { HttpModule, HttpService } from '@nestjs/common';
import { of } from 'rxjs';
import { Test } from '@nestjs/testing';
import { AxiosResponse } from 'axios';

describe('UltimateService', () => {
  let ultimateService: UltimateService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UltimateService,
      ],
      imports: [ HttpModule ],
    }).compile();
    ultimateService = await module.get(UltimateService);
    httpService = await module.get(HttpService);
  });

  describe('when try to get a intent from Ultimate.ai API', () => {
    it('should return the best intent', async () => {
      const data = {
        intents: [
          { confidence: 0.998771607875824, name: "Thank you" },
          { confidence: 0.0006298190564848483, name: "Greeting" }
        ]
      };

      const responseMock: AxiosResponse<any> = {
        data,
        headers: {},
        config: { url: 'http://localhost/mockUrl' },
        status: 200,
        statusText: 'OK',
      };
      const httpSpy = jest.spyOn(httpService, 'post').mockImplementationOnce(() => of(responseMock));
      const result = await ultimateService.getIntents('mocked phrase');
      expect(httpSpy).toBeCalledTimes(1);
      expect(result).toBe('Thank you');
    });
  })
});
