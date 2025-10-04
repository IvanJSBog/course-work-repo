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
exports.StoreService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("../database/database.service");
let StoreService = class StoreService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async getById(storeId, userId) {
        const store = await this.databaseService.query(`
        SELECT * FROM stores WHERE user_id = $1 AND id = $2;
    `, [userId, storeId]);
        if (store.rows.length === 0) {
            throw new common_1.NotFoundException(`Store not found or you are not it's owner`);
        }
        return store.rows[0];
    }
    async createStore(userId, dto) {
        try {
            const result = await this.databaseService.query(`
      INSERT INTO stores (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [userId, dto.title, dto.description]);
            return result.rows[0];
        }
        catch (error) {
            if (error.code === '23505') {
                throw new common_1.ConflictException('Пользователь уже имеет магазин');
            }
            throw error;
        }
    }
    async updateStore(storeId, userId, dto) {
        await this.getById(storeId, userId);
        const keys = Object.keys(dto).filter(key => dto[key] !== undefined);
        if (keys.length === 0)
            return null;
        const setClauses = keys.map((key, i) => `${key} = $${i + 1}`);
        const values = keys.map(key => dto[key]);
        values.push(userId, storeId);
        const sql = `
        UPDATE stores
        SET ${setClauses.join(', ')}
        WHERE user_id = $${values.length - 1} AND id = $${values.length}
        RETURNING *;
    `;
        const result = await this.databaseService.query(sql, values);
        return result.rows[0];
    }
    async deleteStore(storeId, userId) {
        await this.getById(storeId, userId);
        const result = await this.databaseService.query(`
      DELETE FROM stores
      WHERE id = $1
      RETURNING *;
    `, [storeId]);
        return result.rows[0];
    }
};
exports.StoreService = StoreService;
exports.StoreService = StoreService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], StoreService);
//# sourceMappingURL=store.service.js.map