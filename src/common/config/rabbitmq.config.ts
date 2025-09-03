import { Transport, RmqOptions } from '@nestjs/microservices';
import amqp from 'amqp-connection-manager';
import { QUEUES } from 'src/rabitmq/constants/queues';

export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [process.env.RABBITMQ_URL || ''],
    queue: QUEUES.requests,
    queueOptions: {
      durable: true,
    },
  },
});

export const amqpConnection = amqp.connect([
  process.env.RABBITMQ_URL || 'amqp://user:password@localhost:5672',
]);
