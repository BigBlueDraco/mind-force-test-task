import { Module } from '@nestjs/common';
import { ProducerService } from './producer.service';
import { ConsumerController } from './consumer.service';

@Module({
  providers: [ProducerService, ConsumerController],
  exports: [ProducerService],
})
export class RabbitMQModule {}
