import { Worker } from 'bullmq';
import { bullmqConnectionOptions } from '../queue/redis.connection';

const worker = new Worker(
  'email-queue',
  async (job) => {
    console.log('Job recebido:', job.name);
    console.log('Dados:', job.data);
  },
  {
    connection: bullmqConnectionOptions,
  },
);

console.log('🚀 Email Worker rodando...');
