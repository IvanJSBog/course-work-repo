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
exports.DatabaseInitService = void 0;
const common_1 = require("@nestjs/common");
const database_service_1 = require("./database.service");
let DatabaseInitService = class DatabaseInitService {
    databaseService;
    constructor(databaseService) {
        this.databaseService = databaseService;
    }
    async onApplicationBootstrap() {
        await this.databaseService.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);
        await this.databaseService.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'userrole') THEN
          CREATE TYPE userrole AS ENUM ('ADMIN', 'REGULAR');
        END IF;
      END $$;
    `);
        await this.databaseService.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'orderstatus') THEN
          CREATE TYPE orderstatus AS ENUM ('PENDING', 'PAYED');
        END IF;
      END $$;
    `);
        await this.databaseService.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        role userrole NOT NULL DEFAULT 'REGULAR',
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now()
        );
    `);
        await this.databaseService.query(`
      CREATE TABLE IF NOT EXISTS stores (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
    `);
        await this.databaseService.query(`
      CREATE TABLE IF NOT EXISTS categories (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE
        );
    `);
        await this.databaseService.query(`
      CREATE TABLE IF NOT EXISTS products (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE,
        price NUMERIC(10,2) NOT NULL,
        images TEXT[],
        category_id UUID NOT NULL REFERENCES categories(id)
        );
    `);
        await this.databaseService.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        text TEXT NOT NULL,
        rating INT NOT NULL,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE
        );
    `);
        await this.databaseService.query(`
      CREATE TABLE IF NOT EXISTS orders (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        status orderstatus NOT NULL DEFAULT 'PENDING',
        total_price NUMERIC(10,2) NOT NULL,
        user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
        );
    `);
        await this.databaseService.query(`
      CREATE TABLE IF NOT EXISTS order_items (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        created_at TIMESTAMP DEFAULT now(),
        updated_at TIMESTAMP DEFAULT now(),
        price NUMERIC(10,2) NOT NULL,
        quantity INT NOT NULL,
        order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
        product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
        store_id UUID NOT NULL REFERENCES stores(id) ON DELETE CASCADE
        );
    `);
        console.log('✅ Schema ensured on startup');
    }
};
exports.DatabaseInitService = DatabaseInitService;
exports.DatabaseInitService = DatabaseInitService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [database_service_1.DatabaseService])
], DatabaseInitService);
//# sourceMappingURL=database-init.service.js.map