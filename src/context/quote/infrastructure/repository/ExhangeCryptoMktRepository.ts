import axios from 'axios';
import { QuoteRateRepository } from '../../domain/contracts/QuoteRateRepository';
import { CryptoMktResponse } from '../interfaces/CryptoMktResponse';
import config from '../config';

export class ExhangeCryptoMktRepository implements QuoteRateRepository {
  async getRate(from: string, to: string): Promise<number> {
    const url = `${config.CRYPTO_MKT_URL}from=${to}&to=${from}`;
    const response = await axios.get<CryptoMktResponse>(url);

    if (!response)
      throw new Error(
        '<ExhangeCryptoMktRepository> Error to get crypto exhange data',
      );

    const pair = `${from}_${to}`;
    const rateObj = response.data[pair] ?? Object.values(response.data)[0];

    if (!rateObj) {
      throw new Error(
        `<ExhangeCryptoMktRepository> Rate for ${from}_${to} not found`,
      );
    }

    return Number(rateObj.price);
  }
}
