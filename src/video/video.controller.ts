import { Controller, Post, UploadedFile, UseInterceptors, Body, Logger, Get } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { VideoService } from './video.service';
import { Express } from 'express'; // Ensure this line is correctly importing Express

@Controller('video')
export class VideoController {
  private readonly logger = new Logger(VideoController.name);

  constructor(private readonly videoService: VideoService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => Math.round(Math.random() * 16).toString(16)).join('');
        cb(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  async uploadVideo(
    @UploadedFile() videoFile: Express.Multer.File,
    @Body('description') description: string,
  ): Promise<any> {
    this.logger.log(`Received file: ${videoFile.filename}`);
    this.logger.log(`Description: ${description}`);
    
    try {
      const video = await this.videoService.create(description, videoFile.filename);
      this.logger.log('Video saved to database successfully.');
      return video;
    } catch (error) {
      this.logger.error('Error saving video to database', error);
      throw error;
    }
  }

  @Get()
  async getVideos(): Promise<any[]> {
    return this.videoService.findAll();
  }
}
