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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const argon2_1 = require("argon2");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
let AuthService = class AuthService {
    userService;
    configService;
    jwtService;
    constructor(userService, configService, jwtService) {
        this.userService = userService;
        this.configService = configService;
        this.jwtService = jwtService;
    }
    async signUp(dto, res) {
        const newUser = await this.userService.createUser(dto.email, dto.password);
        return this.generateTokens(newUser, res);
    }
    async signIn(dto, res) {
        const user = await this.userService.findUserByEmail(dto.email);
        if (!user) {
            throw new common_1.NotFoundException('User not found');
        }
        const isValidPassword = await (0, argon2_1.verify)(user.password, dto.password);
        if (!isValidPassword) {
            throw new common_1.UnauthorizedException('Invalid password');
        }
        return this.generateTokens(user, res);
    }
    async logout(res) {
        res.clearCookie('refresh_token');
    }
    async generateTokens(user, res) {
        const payload = { id: user.id, role: user.role };
        const accessToken = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
        const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });
        res.cookie('refresh_token', refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return { accessToken };
    }
    async refresh(req) {
        const refreshToken = req.cookies['refresh_token'];
        if (!refreshToken) {
            throw new common_1.UnauthorizedException('Refresh token not found');
        }
        let payload;
        try {
            payload = await this.jwtService.verifyAsync(refreshToken);
        }
        catch (err) {
            throw new common_1.UnauthorizedException('Invalid refresh token');
        }
        const user = await this.userService.findUserById(payload.id);
        if (!user) {
            throw new common_1.UnauthorizedException('User not found');
        }
        const { exp, iat, ...cleanPayload } = payload;
        const accessToken = await this.jwtService.signAsync(cleanPayload, { expiresIn: '15m' });
        return { accessToken };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        config_1.ConfigService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map