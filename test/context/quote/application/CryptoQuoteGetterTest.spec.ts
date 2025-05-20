import 'reflect-metadata';
import { CryptoQuoteGetter } from 'src/context/quote/application/CryptoQuoteGetter';
import { QuotePersistRepository } from 'src/context/quote/domain/contracts/QuotePersistRepository';
import { genericQuote } from '../utils/GenericQuote';
import { NotFoundException } from '@nestjs/common';

describe('CryptoQuoteGetter', () => {
  const repo: jest.Mocked<QuotePersistRepository> = {
    save: jest.fn(),
    findById: jest.fn(),
  };

  let getter: CryptoQuoteGetter;

  beforeEach(() => {
    jest.clearAllMocks();
    getter = new CryptoQuoteGetter(repo);
  });

  it('return quote by id', async () => {
    const quote = genericQuote();
    repo.findById.mockResolvedValue(quote);

    const result = await getter.run(quote.props.id);
    console.log(result);

    expect(repo.findById).toHaveBeenCalledWith(quote.props.id);
    expect(result).toBe(quote);
  });

  it('return non-exists quote Id', async () => {
    repo.findById.mockResolvedValue(null);

    await expect(getter.run('non-exists')).rejects.toThrow(NotFoundException);
    expect(repo.findById).toHaveBeenCalledWith('non-exists');
  });
});
