import { AppService } from './app.service';
export declare class AppController {
    private readonly appService;
    googleService: any;
    constructor(appService: AppService);
    getHello(): string;
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any): Promise<{
        message: string;
        user: any;
    }>;
}
