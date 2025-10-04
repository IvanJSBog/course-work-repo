import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { DatabaseService } from './database.service';

@Injectable()
export class DatabaseInitService implements OnApplicationBootstrap {
  constructor(private readonly databaseService: DatabaseService) {}

  async onApplicationBootstrap(): Promise<void> {
    await this.databaseService.query(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp";`);

    await this.databaseService.query(`
      DO $$
      BEGIN
        IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'userrole') THEN
          CREATE TYPE userrole AS ENUM ('ADMIN', 'REGULAR', 'SELLER');
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
        total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
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
}