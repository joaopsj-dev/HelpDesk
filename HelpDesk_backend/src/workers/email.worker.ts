import { NestFactory } from '@nestjs/core';
import { WorkerModule } from './worker.module';
import { Job, Worker } from 'bullmq';
import { EmailService } from '../app/modules/email/email.service';
import { bullmqConnectionOptions } from '../config/redis.connection';
import { jobs } from '../app/common/rules/jobs';
import { SendEmailDTO } from 'src/app/modules/email/dtos/send-email.dto';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(WorkerModule);

  const emailService = app.get(EmailService);

  new Worker(
    'email-queue',
    async (job: Job<SendEmailDTO, any, string>) => {
      if (job.name === jobs.send_email.name) {
        await emailService.send(job.data);
      }
    },
    {
      connection: bullmqConnectionOptions,
    },
  );
}

bootstrap();
