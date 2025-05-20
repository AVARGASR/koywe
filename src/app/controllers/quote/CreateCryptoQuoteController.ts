import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger/dist/decorators';
import { JwtAuthGuard } from 'src/app/middlewares/auth/jwt-auth.guard';
import { ValidateQuote } from 'src/app/middlewares/dto/ValidateQuote';
import { CryptoQuoteFacade } from 'src/context/quote/application/CryptoQuoteFacade';
import { Quote } from 'src/context/quote/domain/class/Quote';

@ApiTags('Quote')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('quote')
export class CreateCryptoQuoteController {
  constructor(private readonly quoteFacade: CryptoQuoteFacade) {}

  @Post('/')
  async createCryptoQuote(
    @Body() { from, to, amount }: ValidateQuote,
  ): Promise<Quote> {
    return await this.quoteFacade.createQuote(from, to, amount);
  }

  @Get(':id')
  async getCryptoQuote(@Param('id') id: string): Promise<Quote> {
    return this.quoteFacade.getQuote(id);
  }
}
