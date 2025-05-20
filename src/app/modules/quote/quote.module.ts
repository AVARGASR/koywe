import { Module } from '@nestjs/common';
import { CreateCryptoQuoteController } from 'src/app/controllers/quote/CreateCryptoQuoteController';
import { CryptoQuoteCreator } from 'src/context/quote/application/CryptoQuoteCreator';
import { CryptoQuoteFacade } from 'src/context/quote/application/CryptoQuoteFacade';
import { CryptoQuoteGetter } from 'src/context/quote/application/CryptoQuoteGetter';
import { CryptoQuotePersister } from 'src/context/quote/application/CryptoQuotePersister';
import { InfrastructureQuoteModule } from 'src/context/quote/infrastructure/infrastructure.quote.module';

@Module({
  imports: [InfrastructureQuoteModule],
  controllers: [CreateCryptoQuoteController],
  providers: [
    CryptoQuoteCreator,
    CryptoQuotePersister,
    CryptoQuoteGetter,
    CryptoQuoteFacade,
  ],
})
export class QuoteModule {}
