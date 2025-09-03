import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { RabbitMQModule } from 'src/rabitmq/rabbitmq.module';

@Module({
  controllers: [RequestController],
  providers: [RequestService],
  imports: [RabbitMQModule],
})
export class RequestModule {}
