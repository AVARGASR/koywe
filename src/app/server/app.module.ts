import { Module } from '@nestjs/common';
import { QuoteModule } from '../modules/quote/quote.module';
import { DatabaseModule } from 'src/context/quote/infrastructure/infrastructure.database.module';
import { AuthModule } from '../modules/auth/auth.module';

@Module({
  imports: [AuthModule, QuoteModule, DatabaseModule],
})
export class AppModule {}
