import { redisStore } from "cache-manager-redis-store";
import type { RedisClientOptions } from 'redis';

export const cacheConfig: RedisClientOptions = {
  store: redisStore,
  host: 'localhost',
  port: 6379,
};
