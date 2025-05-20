import { v4 as uuid } from 'uuid';
import { QuoteRateRepository } from '../domain/contracts/QuoteRateRepository';
import { Quote } from '../domain/class/Quote';
import { Inject, Injectable } from '@nestjs/common/decorators';

@Injectable()
export class CryptoQuoteCreator {
  constructor(
    @Inject('QuoteRateRepository')
    private readonly quoteRate: QuoteRateRepository,
  ) {}

  async run(to: string, from: string, amount: number): Promise<Quote> {
    const rate = await this.quoteRate.getRate(to, from);

    const convertedAmount = amount * rate;
    const now = new Date();
    const expiresAt = new Date(now.getTime() + 5 * 60_000);

    const quote = new Quote({
      id: uuid(),
      to,
      from,
      amount,
      rate,
      convertedAmount,
      timestamp: now,
      expiresAt,
    });

    return quote;
  }
}
