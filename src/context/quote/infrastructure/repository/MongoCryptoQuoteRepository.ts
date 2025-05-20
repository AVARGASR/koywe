import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { Quote } from '../../domain/class/Quote';
import { QuotePersistRepository } from '../../domain/contracts/QuotePersistRepository';
import { QuoteDocument } from '../schemas/MongoQuoteSchema';

@Injectable()
export class MongoCryptoQuoteRepository implements QuotePersistRepository {
  constructor(
    @InjectModel('Quote')
    private readonly quoteModel: Model<QuoteDocument>,
  ) {}

  async save(quote: Quote): Promise<void> {
    const toSave = new this.quoteModel({
      id: quote.props.id,
      from: quote.props.from,
      to: quote.props.to,
      amount: quote.props.amount,
      rate: quote.props.rate,
      convertedAmount: quote.props.convertedAmount,
      timestamp: quote.props.timestamp,
      expiresAt: quote.props.expiresAt,
    });
    await toSave.save();
  }

  async findById(id: string): Promise<Quote> {
    const quote = await this.quoteModel.findOne({ id }).lean();
    if (!quote || quote.expiresAt <= new Date())
      throw new Error(`Error to find by id: ${id}`);
    return new Quote(quote);
  }
}
