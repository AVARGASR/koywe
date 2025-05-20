import 'reflect-metadata';
import { QuotePersistRepository } from 'src/context/quote/domain/contracts/QuotePersistRepository';
import { genericQuote } from '../utils/GenericQuote';
import { CryptoQuotePersister } from 'src/context/quote/application/CryptoQuotePersister';

describe('CryptoQuotePersister', () => {
  const repo: jest.Mocked<QuotePersistRepository> = {
    save: jest.fn(),
    findById: jest.fn(),
  };

  const persister = new CryptoQuotePersister(repo);

  it('delegates to repository.save', async () => {
    const quote = genericQuote();
    await persister.run(quote);
    expect(repo.save).toHaveBeenCalledWith(quote);
  });
});
