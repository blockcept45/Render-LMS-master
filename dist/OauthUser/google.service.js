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
exports.GoogleService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const google_schema_1 = require("./google.schema");
const jwt = require("jsonwebtoken");
let GoogleService = class GoogleService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async findByOauthId(oauthId) {
        return this.userModel.findOne({ oauthId }).exec();
    }
    async findByEmail(email) {
        return this.userModel.findOne({ email }).exec();
    }
    async create(userData) {
        const newUser = new this.userModel(userData);
        return newUser.save();
    }
    async findOrCreateUser(userData) {
        let user = await this.findByOauthId(userData.oauthId);
        if (!user) {
            user = await this.create(userData);
        }
        else {
            user.accessToken = userData.accessToken;
            user.firstName = userData.firstName;
            user.lastName = userData.lastName;
            user.picture = userData.picture;
            await user.save();
        }
        return user;
    }
    generateJwt(user) {
        const payload = {
            id: user._id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
        };
        return jwt.sign(payload, 'your_secret_key', { expiresIn: '1h' });
    }
};
exports.GoogleService = GoogleService;
exports.GoogleService = GoogleService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(google_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], GoogleService);
//# sourceMappingURL=google.service.js.map