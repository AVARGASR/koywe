export interface QuoteProps {
  id: string;
  from: string;
  to: string;
  amount: number;
  rate: number;
  convertedAmount: number;
  timestamp: Date;
  expiresAt: Date;
}

export class Quote {
  constructor(public readonly props: QuoteProps) {}

  toJSON() {
    return { ...this.props };
  }
}
