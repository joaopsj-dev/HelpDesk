import { Queue } from 'bullmq';
import { bullmqConnectionOptions } from './redis.connection';

export const emailQueue = new Queue('email-queue', {
  connection: bullmqConnectionOptions,
});
