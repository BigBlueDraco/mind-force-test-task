import { Module } from '@nestjs/common';
import { TypeService } from './type.service';
import { TypeController } from './type.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [TypeController],
  providers: [TypeService],
  imports: [PrismaModule],
})
export class TypeModule {}
