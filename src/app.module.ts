import { Module } from '@nestjs/common';
import { RequestModule } from './request/request.module';
import { ConfigModule } from '@nestjs/config';
import { TypeModule } from './type/type.module';
import { StatusModule } from './status/status.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RequestModule,
    TypeModule,
    StatusModule,
  ],
})
export class AppModule {}
