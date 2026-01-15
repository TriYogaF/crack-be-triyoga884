import { Module } from '@nestjs/common';
import { StatService } from './stat.service.js';
import { StatController } from './stat.controller.js';
import { PrismaModule } from '../prisma/prisma.module.js';
import { UserModule } from '../user/user.module.js';
import { BookingModule } from '../booking/booking.module.js';
import { CoworkingSpaceModule } from '../coworking-space/coworking-space.module.js';

@Module({
  imports: [PrismaModule, UserModule, BookingModule, CoworkingSpaceModule],
  controllers: [StatController],
  providers: [StatService],
})
export class StatModule {}
