import { MongoClient } from 'mongodb';
import { ENV } from '../domain/system/env.js';

const connectDataBase = async () => {

    if (!ENV.MONGODB_URL) {
        throw new Error('MongoDB URL is required.');
    }	

    if (!ENV.MONGO_DB_NAME) {
        throw new Error('MongoDB Database name is required.');
    }


  try {
    const client = new MongoClient(ENV.MONGODB_URL);

    await client.connect();

    const db = client.db(ENV.MONGO_DB_NAME);
    
    console.log(`Connected to database: ${ENV.MONGO_DB_NAME}`);

    return db;
  } catch (err) {
    throw new Error(err.message);
  }
};

export {
  connectDataBase
};

