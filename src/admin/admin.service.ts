import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './schemas/admin.schema';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(@InjectModel(Admin.name) private adminModel: Model<Admin>) {}

  async findByUserId(userId: string): Promise<Admin> {
    return this.adminModel.findOne({ user: userId }).exec();
  }

  async update(userId: string, updateAdminDto: UpdateAdminDto): Promise<Admin> {
    return this.adminModel.findOneAndUpdate({ user: userId }, updateAdminDto, { new: true }).exec();
  }
}
