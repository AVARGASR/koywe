import { Quote } from '../class/Quote';

export interface QuotePersistRepository {
  save(quote: Quote): Promise<void>;
  findById(id: string): Promise<Quote>;
}
