import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const AdminLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class AdminLocalStrategy extends AdminLocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
}
export {};
