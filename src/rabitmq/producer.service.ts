import { Injectable } from '@nestjs/common';
import * as amqp from 'amqp-connection-manager';

@Injectable()
export class ProducerService {
  private channel: amqp.ChannelWrapper;

  constructor() {
    const connection = amqp.connect(['amqp://user:password@localhost:5672']);
    this.channel = connection.createChannel({
      setup: async (channel) => {
        await channel.assertExchange('delayed_exchange', 'x-delayed-message', {
          durable: true,
          arguments: { 'x-delayed-type': 'direct' },
        });
        await channel.assertQueue('queue', { durable: true });
        await channel.bindQueue('queue', 'delayed_exchange', 'my-key');
      },
    });
  }

  async sendWithDelay(msg: any, delayMs: number) {
    await this.channel.publish(
      'delayed_exchange',
      'my-key',
      Buffer.from(JSON.stringify(msg)),
      {
        headers: { 'x-delay': delayMs },
        persistent: true,
      } as any,
    );
  }
}
