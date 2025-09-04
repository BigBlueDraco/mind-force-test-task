import { Controller, Logger, OnModuleInit } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import * as amqp from 'amqp-connection-manager';
import { ChannelWrapper } from 'amqp-connection-manager';
import { RequestService } from '../request.service';
@Controller()
export class RequestConsumer implements OnModuleInit {
  constructor(private readonly requestService: RequestService) {}
  private channel: ChannelWrapper;
  async handleMessage(data: Record<string, any>) {
    this.requestService.changeToNextStatus(data.id);
  }
  onModuleInit() {
    const connection = amqp.connect(['amqp://user:password@localhost:5672']);
    this.channel = connection.createChannel({
      setup: async (channel) => {
        await channel.assertQueue('queue', { durable: true });
        await channel.consume('queue', (msg) => {
          if (msg) {
            this.handleMessage(JSON.parse(msg.content));
            channel.ack(msg);
          }
        });
      },
    });
  }
}
