import { Module } from '@nestjs/common';
import { RequestService } from './request.service';
import { RequestController } from './request.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RequestConsumer } from './rabbitmq/request-consumer.service';
import { ProducerService } from './rabbitmq/producer.service';

@Module({
  controllers: [RequestController],
  providers: [RequestService, RequestConsumer, ProducerService],
  imports: [PrismaModule],
})
export class RequestModule {}
