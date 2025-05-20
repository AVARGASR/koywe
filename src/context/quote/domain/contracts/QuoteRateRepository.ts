export interface QuoteRateRepository {
  getRate(from: string, to: string): Promise<number>;
}
