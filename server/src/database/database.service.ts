import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService implements OnModuleInit, OnModuleDestroy {
  private pool: Pool;

  constructor(private readonly config: ConfigService) {
    this.pool = new Pool({
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

  async query<T = any>(sql: string, params?: any[]): Promise<T[]> {
    const res = await this.pool.query(sql, params);
    return res.rows;
  }
}
