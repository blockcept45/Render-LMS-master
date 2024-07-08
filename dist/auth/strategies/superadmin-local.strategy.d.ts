import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
declare const SuperAdminLocalStrategy_base: new (...args: any[]) => Strategy;
export declare class SuperAdminLocalStrategy extends SuperAdminLocalStrategy_base {
    private readonly authService;
    constructor(authService: AuthService);
}
export {};
