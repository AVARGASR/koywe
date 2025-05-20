export interface CryptoMktResponse {
  [key: string]: {
    currency: string;
    price: string;
    timestamp: string;
  };
}
