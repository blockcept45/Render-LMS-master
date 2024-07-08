import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Video, VideoDocument } from './video.model';

@Injectable()
export class VideoService {
  constructor(@InjectModel(Video.name) private readonly videoModel: Model<VideoDocument>) {}

  // Method to create a new video entry
  async create(description: string, filename: string): Promise<Video> {
    const newVideo = new this.videoModel({ description, filename });
    return await newVideo.save();
  }

  // Method to find all videos
  async findAll(): Promise<Video[]> {
    return await this.videoModel.find().exec();
  }
}
