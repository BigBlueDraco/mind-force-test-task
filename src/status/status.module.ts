import { Module } from '@nestjs/common';
import { PrismaModule } from 'src/prisma/prisma.module';
import { StatusController } from './status.controller';
import { StatusService } from './status.service';

@Module({
  controllers: [StatusController],
  providers: [StatusService],
  imports: [PrismaModule],
})
export class StatusModule {}
