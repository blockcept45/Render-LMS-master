import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAdminDetails(userId: string): Promise<import("./schemas/admin.schema").Admin>;
}
