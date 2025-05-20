import { Quote } from 'src/context/quote/domain/class/Quote';

export const genericQuote = (): Quote =>
  new Quote({
    id: 'uuid-123',
    from: 'ARS',
    to: 'ETH',
    amount: 1000000,
    rate: 0.0000023,
    convertedAmount: 2.3,
    timestamp: new Date('2025-02-03T12:00:00Z'),
    expiresAt: new Date('2025-02-03T12:05:00Z'),
  });
