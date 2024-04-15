import { createClient } from 'redis';

const redisUrl = 'redis://192.168.0.121:6379';

console.log(process.env.redisHost, ':', process.env.redisPort);
// const url = `redis://${process.env.redisHost}:${process.env.redisPort}`;

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
