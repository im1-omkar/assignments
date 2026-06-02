import { Client, type ClientConfig } from 'pg'
import { DB_URL } from './config';

const clientConfig: ClientConfig = {
  connectionString: DB_URL,
};

if (DB_URL.includes('sslmode=require') || DB_URL.includes('ssl=true')) {
  clientConfig.ssl = { rejectUnauthorized: false };
}

export const client = new Client(clientConfig);



