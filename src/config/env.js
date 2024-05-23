import dotenv from 'dotenv';

dotenv.config();


export const config = {
  port: process.env.PORT,
  db: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  },
  secret: process.env.SECRET_KEY,
  apiLayerKey: process.env.APILAYER_KEY,
};