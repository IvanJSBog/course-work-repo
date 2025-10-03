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
          CREATE TYPE userrole AS ENUM ('ADMIN', 'REGULAR');
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

    console.log('✅ Schema ensured on startup');
  }
}