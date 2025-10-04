import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateStoreDto } from './dto/create-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getById(storeId: string, userId: string) {
    const store = await this.databaseService.query(`
        SELECT * FROM stores WHERE user_id = $1 AND id = $2;
    `,
      [userId, storeId],
    );

    if (!store) {
      throw new NotFoundException(`Store not found or you are not it's owner`);
    }
    return store.rows[0];
  }

  async createStore(userId: string, dto: CreateStoreDto) {
    try {
      const result = await this.databaseService.query(`
      INSERT INTO stores (user_id, title, description)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [userId, dto.title, dto.description]);

      return result.rows[0];
    } catch (error: any) {
      if (error.code === '23505') { // уникальный ключ нарушен
        throw new ConflictException('Пользователь уже имеет магазин');
      }
      throw error;
    }
  }
}
