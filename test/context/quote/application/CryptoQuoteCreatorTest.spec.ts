import 'reflect-metadata';
import { CryptoQuoteCreator } from 'src/context/quote/application/CryptoQuoteCreator';
import { QuoteRateRepository } from 'src/context/quote/domain/contracts/QuoteRateRepository';

describe('CryptoQuoteCreator', () => {
  const mockRateRepo: QuoteRateRepository = {
    getRate: jest.fn(),
  };

  let creator: CryptoQuoteCreator;

  beforeEach(() => {
    creator = new CryptoQuoteCreator(mockRateRepo);
  });

  it('create a valid quote', async () => {
    const from = 'USD';
    const to = 'CLP';
    const amount = 10;
    const rate = 850;

    jest.spyOn(mockRateRepo, 'getRate').mockResolvedValue(rate);

    const quote = await creator.run(to, from, amount);

    expect(mockRateRepo.getRate).toHaveBeenCalledWith(to, from);
    expect(quote.props.from).toBe(from);
    expect(quote.props.to).toBe(to);
    expect(quote.props.amount).toBe(amount);
    expect(quote.props.rate).toBe(rate);
    expect(quote.props.convertedAmount).toBe(amount * rate);
    expect(quote.props.id).toBeDefined();
    expect(quote.props.timestamp).toBeInstanceOf(Date);
    expect(quote.props.expiresAt.getTime()).toBeGreaterThan(
      quote.props.timestamp.getTime(),
    );
  });
});
