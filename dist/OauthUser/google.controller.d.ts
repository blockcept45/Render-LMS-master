import { GoogleService } from './google.service';
export declare class GoogleController {
    private readonly googleService;
    constructor(googleService: GoogleService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: any): Promise<any>;
}
