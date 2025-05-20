import { Schema, Document } from 'mongoose';

export interface QuoteDocument extends Document {
  id: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  timestamp: Date;
  expiresAt: Date;
}

export const MongoQuoteSchema = new Schema<QuoteDocument>(
  {
    id: { type: String, required: true, unique: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    amount: { type: Number, required: true },
    rate: { type: Number, required: true },
    convertedAmount: { type: Number, required: true },
    timestamp: { type: Date, required: true },
    expiresAt: {
      type: Date,
      required: true,
      index: true,
      expires: 0,
    },
  },
  { collection: 'quotes', versionKey: false },
);
