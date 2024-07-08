import { Controller, Get, Param } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get(':userId')
  async getAdminDetails(@Param('userId') userId: string) {
    return this.adminService.findByUserId(userId);
  }
}
