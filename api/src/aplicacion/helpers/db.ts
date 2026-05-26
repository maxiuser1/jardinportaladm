// Polyfill for @typespec/ts-http-runtime bug with crypto
if (typeof global !== 'undefined' && !global.crypto) {
  global.crypto = require('crypto').webcrypto || require('crypto');
}

if (typeof globalThis !== 'undefined' && !globalThis.crypto) {
  globalThis.crypto = require('crypto').webcrypto || require('crypto');
}

import { Container, CosmosClient, Database } from '@azure/cosmos';

export const db = (): Database => {
  const client = new CosmosClient(
    process.env['ConnectionStrings:CosmosDBConnection'] ??
    process.env['CosmosDBConnection']
  );
  return client.database('jardindb');
};