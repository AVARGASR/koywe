import { Injectable } from '@nestjs/common';
import { CryptoQuoteCreator } from './CryptoQuoteCreator';
import { CryptoQuoteGetter } from './CryptoQuoteGetter';
import { Quote } from '../domain/class/Quote';
import { CryptoQuotePersister } from './CryptoQuotePersister';

@Injectable()
export class CryptoQuoteFacade {
  constructor(
    private readonly creator: CryptoQuoteCreator,
    private readonly getter: CryptoQuoteGetter,
    private readonly persister: CryptoQuotePersister,
  ) {}

  async createQuote(from: string, to: string, amount: number): Promise<Quote> {
    const quote = await this.creator.run(to, from, amount);
    await this.persister.run(quote);
    return quote;
  }

  async getQuote(id: string): Promise<Quote> {
    return this.getter.run(id);
  }
}
