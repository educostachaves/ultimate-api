import { Injectable, HttpService } from '@nestjs/common';

const {
  ULTIMATE_BOT_ID: botId,
  ULTIMATE_APIKEY: apiKey,
  ULTIMATE_HOST: host,
} = process.env;

@Injectable()
export class UltimateService {
  constructor(
    private httpService: HttpService,
  ) {}

  async getIntents(message: string): Promise<string> {
    return new Promise(resolve => {
      this.httpService.post(
        host,
        {
          botId,
          message,
        },
        {
          headers: {
            'Authorization': apiKey,
          },
        }).subscribe((res) => {
          const { data } = res;
          const maxIntent = Math.max.apply(Math, data.intents.map((i) => { return i.confidence; }));
          resolve(data.intents.find((i) => i.confidence === maxIntent).name)
        });
    });
  }
}
