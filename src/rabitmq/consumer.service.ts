import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import * as amqp from 'amqp-connection-manager';
import { ChannelWrapper } from 'amqp-connection-manager';
@Controller()
export class ConsumerController implements OnModuleInit {
  private channel: ChannelWrapper;
  //   @EventPattern('queue')
  //   async handleMessage(data: Record<string, any>) {
  //     console.log('Received message:', data);
  //     console.log(data.content - Date.now());
  //   }
  onModuleInit() {
    const connection = amqp.connect(['amqp://user:password@localhost:5672']);
    this.channel = connection.createChannel({
      setup: async (channel) => {
        await channel.assertQueue('queue', { durable: true });
        await channel.consume('queue', (msg) => {
          if (msg) {
            Logger.log(`Received message: ${msg.content.toString()}`);
            channel.ack(msg);
          }
        });
      },
    });
  }
}
