import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [RequestModule, ConfigModule.forRoot({ isGlobal: true })],
})
export class AppModule {}
