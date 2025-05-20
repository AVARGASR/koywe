import { Module } from '@nestjs/common';

import { CryptoQuoteCreator } from '../application/CryptoQuoteCreator';
import { ExhangeCryptoMktRepository } from './repository/ExhangeCryptoMktRepository';
import { MongooseModule } from '@nestjs/mongoose';
import { MongoCryptoQuoteRepository } from './repository/MongoCryptoQuoteRepository';
import { CryptoQuotePersister } from '../application/CryptoQuotePersister';
import { CryptoQuoteGetter } from '../application/CryptoQuoteGetter';
import { MongoQuoteSchema } from './schemas/MongoQuoteSchema';
import { CryptoQuoteFacade } from '../application/CryptoQuoteFacade';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Quote', schema: MongoQuoteSchema }]),
  ],
  providers: [
    CryptoQuoteCreator,
    CryptoQuotePersister,
    CryptoQuoteGetter,
    CryptoQuoteFacade,
    {
      provide: 'QuoteRateRepository',
      useClass: ExhangeCryptoMktRepository,
    },
    {
      provide: 'QuotePersistRepository',
      useClass: MongoCryptoQuoteRepository,
    },
  ],
  exports: [
    CryptoQuoteCreator,
    CryptoQuotePersister,
    CryptoQuoteGetter,
    CryptoQuoteFacade,
    'QuoteRateRepository',
    'QuotePersistRepository',
  ],
})
export class InfrastructureQuoteModule {}
