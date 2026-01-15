import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class StatService {
  constructor(private readonly prisma: PrismaService) {}

  async getTotalStat() {
    const [
      userCount,
      workspaceCount,
      bookingCount,
      providerCount,
      unVerifiedWorkspaces,
    ] = await this.prisma.$transaction([
      this.prisma.user.count({
        where: { role: 'USER' },
      }),
      this.prisma.coworkingSpace.count(),
      this.prisma.booking.count(),
      this.prisma.user.count({
        where: { role: 'PROVIDER' },
      }),
      this.prisma.coworkingSpace.count({
        where: { isVerified: false },
      }),
    ]);

    return [
      { title: 'Total Users', value: userCount },
      { title: 'Total Workspaces', value: workspaceCount },
      { title: 'Total Bookings', value: bookingCount },
      { title: 'Total Providers', value: providerCount },
      { title: 'Awaiting Workspaces Approval', value: unVerifiedWorkspaces },
    ];
  }

  async getTotalStatByUserId(id: string) {
    const [workspaceCount, bookingCount, incomeCount] =
      await this.prisma.$transaction([
        this.prisma.coworkingSpace.count({
          where: { ownerId: id },
        }),
        this.prisma.booking.count({
          where: { coworkingSpace: { ownerId: id } },
        }),
        this.prisma.payment.findMany({
          where: {
            status: 'PAID',
            booking: { coworkingSpace: { ownerId: id } },
          },
          include: { booking: { select: { totalPrice: true } } },
        }),
      ]);
    const totalIncome = incomeCount.reduce(
      (sum, e) => sum + e.booking.totalPrice,
      0,
    );
    return [
      { title: 'Total Workspaces', value: workspaceCount },
      { title: 'Total Bookings', value: bookingCount },
      { title: 'Total Income', value: totalIncome },
    ];
  }
}
