"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleController = void 0;
const common_1 = require("@nestjs/common");
const passport_1 = require("@nestjs/passport");
const google_service_1 = require("./google.service");
const jwt = require("jsonwebtoken");
let GoogleController = class GoogleController {
    constructor(googleService) {
        this.googleService = googleService;
    }
    async googleAuth() { }
    async googleAuthRedirect(req, res) {
        const user = req.user;
        if (!user || !user.id || !user.email || !user.firstName || !user.lastName || !user.picture) {
            return res.redirect('http://localhost:3000/login');
        }
        const token = jwt.sign({ id: user.id, email: user.email, firstName: user.firstName, lastName: user.lastName, picture: user.picture }, 'your-secret-key', { expiresIn: '1h' });
        res.cookie('token', token, { httpOnly: true });
        res.cookie('userId', user.id);
        res.cookie('userEmail', user.email);
        res.cookie('userFirstName', user.firstName);
        res.cookie('userLastName', user.lastName);
        res.cookie('userPicture', user.picture);
        res.send("save");
    }
};
exports.GoogleController = GoogleController;
__decorate([
    (0, common_1.Get)('auth/google'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "googleAuth", null);
__decorate([
    (0, common_1.Get)('auth/google/callback'),
    (0, common_1.UseGuards)((0, passport_1.AuthGuard)('google')),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], GoogleController.prototype, "googleAuthRedirect", null);
exports.GoogleController = GoogleController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [google_service_1.GoogleService])
], GoogleController);
//# sourceMappingURL=google.controller.js.map