import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { StatService } from './stat.service.js';
import { JwtAuthGuard } from '../auth/jwt.auth-guard.js';
import { RolesGuard } from '../common/guards/roles.guard.js';
import { Roles } from '../common/decorators/roles.decorator.js';
import { reqProp } from '../common/types/types.js';

@Controller('stats')
export class StatController {
  constructor(private readonly statService: StatService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get()
  getTotalStat() {
    return this.statService.getTotalStat();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('PROVIDER')
  @Get('me')
  getTotalStatByUserId(@Req() req: { user: reqProp }) {
    return this.statService.getTotalStatByUserId(req.user.userId);
  }
}
