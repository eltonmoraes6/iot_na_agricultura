require('dotenv').config();
import config from 'config';
import { createClient } from 'redis';

console.log(
  'process.env.redisHost: ',
  process.env.redisHost,
  ':',
  process.env.redisPort
);
// const url = `redis://${process.env.redisHost}:${process.env.redisPort}`;

const redisConfig = config.get<{
  host: string;
  port: number;
  // username: string;
  // password: string;
  // database: string;
}>('redisConfig');

const redisUrl = `${redisConfig.host}:${redisConfig.port}`;

const redisClient = createClient({
  url: redisUrl,
});

const connectRedis = async () => {
  try {
    await redisClient.connect();
    console.log('Redis client connect successfully');
    redisClient.set('try', 'Hello Welcome to Express with TypeORM');
  } catch (error) {
    console.log(error);
    setTimeout(connectRedis, 5000);
  }
};

connectRedis();

export default redisClient;
