import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare class DatabaseService implements OnModuleInit, OnModuleDestroy {
    private readonly config;
    private pool;
    constructor(config: ConfigService);
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    query<T = any>(sql: string, params?: any[]): Promise<any>;
}
