import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // to avoid the need of importing it everytime
@Module({
  providers: [PrismaService],
})
export class PrismaModule {}
