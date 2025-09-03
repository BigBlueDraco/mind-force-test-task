import { Transport, RmqOptions } from '@nestjs/microservices';

export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: ['URL'],
    queue: 'my_queue',
    queueOptions: {
      durable: true,
    },
  },
});
