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
exports.DatabaseService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const pg_1 = require("pg");
let DatabaseService = class DatabaseService {
    config;
    pool;
    constructor(config) {
        this.config = config;
        this.pool = new pg_1.Pool({
            host: this.config.getOrThrow('POSTGRES_HOST'),
            port: parseInt(this.config.getOrThrow('POSTGRES_PORT')),
            user: this.config.getOrThrow('POSTGRES_USER'),
            password: this.config.getOrThrow('POSTGRES_PASSWORD'),
            database: this.config.getOrThrow('POSTGRES_DB'),
        });
    }
    async onModuleInit() {
        await this.pool.query('SELECT 1');
        console.log('✅ Database connected');
    }
    async onModuleDestroy() {
        await this.pool.end();
        console.log('❌ Database disconnected');
    }
    async query(sql, params) {
        const res = await this.pool.query(sql, params);
        return res.rows;
    }
};
exports.DatabaseService = DatabaseService;
exports.DatabaseService = DatabaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], DatabaseService);
//# sourceMappingURL=database.service.js.map