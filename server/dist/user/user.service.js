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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
const argon2_1 = require("argon2");
let UserService = class UserService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async findUserById(id) {
        const user = await this.databaseService.query('SELECT * FROM users WHERE id = $1', [id]);
        if (!user.rows.length) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.rows[0];
    }
    async findUserByEmail(email) {
        const user = await this.databaseService.query(`
        SELECT * FROM users WHERE email = $1
      `, [email]);
        if (!user.rows.length) {
            throw new common_1.NotFoundException('User not found');
        }
        return user.rows[0];
    }
    async createUser(email, password) {
        try {
            const hashedPassword = await (0, argon2_1.hash)(password);
            const result = await this.databaseService.query('INSERT INTO users(email, password) VALUES($1, $2) RETURNING *', [email, hashedPassword]);
            return result.rows[0];
        }
        catch (error) {
            throw error;
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], UserService);
//# sourceMappingURL=user.service.js.map