/// <reference types="multer" />
import { VideoService } from './video.service';
export declare class VideoController {
    private readonly videoService;
    private readonly logger;
    constructor(videoService: VideoService);
    uploadVideo(videoFile: Express.Multer.File, description: string): Promise<any>;
    getVideos(): Promise<any[]>;
}
