import { Quote } from '../domain/class/Quote';
import { Inject, Injectable } from '@nestjs/common/decorators';
import { QuotePersistRepository } from '../domain/contracts/QuotePersistRepository';

@Injectable()
export class CryptoQuotePersister {
  constructor(
    @Inject('QuotePersistRepository')
    private readonly repository: QuotePersistRepository,
  ) {}

  async run(quote: Quote): Promise<void> {
    return await this.repository.save(quote);
  }
}
