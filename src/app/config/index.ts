import 'dotenv/config';

const env = (key: string) => {
  return process.env[key];
};

export default {
  PORT: env('PORT') ?? 3000,
  ENVIRONMENT: env('ENVIRONMENT') ?? 'DEVELOP',
  DATABASE: {
    CONNECTION:
      env('MONGO_CONNECTION') ?? 'mongodb://localhost:27017/koywe-challenge',
  },
  TOKEN_JWT: {
    ACCESS_TOKEN: env('ACCESS_TOKEN_JWT') ?? '',
    EXPIRES_IN: env('ACCESS_TOKEN_EXPIRES_IN') ?? '24h',
  },
  EXCHANGE_CRYPTO_MKT: {
    URL: env('EXCHANGE_CRYPTO_MKT_URL') ?? '',
  },
};
