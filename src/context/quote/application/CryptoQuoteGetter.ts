import { Quote } from '../domain/class/Quote';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { QuotePersistRepository } from '../domain/contracts/QuotePersistRepository';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class CryptoQuoteGetter {
  constructor(
    @Inject('QuotePersistRepository')
    private readonly repository: QuotePersistRepository,
  ) {}

  async run(id: string): Promise<Quote> {
    const quote = await this.repository.findById(id);
    if (!quote) throw new NotFoundException(`Quote with ID ${id} not found`);

    return quote;
  }
}
