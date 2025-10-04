import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';

@Injectable()
export class StoreService {
  constructor(private readonly databaseService: DatabaseService) {}

  async getById(storeId: string, userId: string) {
    const store = await this.databaseService.query(`
        SELECT * FROM stores WHERE user_id = $1 AND id = $2;
    `,
      [userId, storeId],
    );

    if (store.rows.length === 0) {
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

  async updateStore(storeId: string, userId: string, dto: UpdateStoreDto) {
    // проверка на наличие данного пользователя с магазином в бд
    await this.getById(storeId, userId);
    // формирование patch запроса
    const keys = Object.keys(dto).filter(key => dto[key] !== undefined);
    if (keys.length === 0) return null; // Нет полей для обновления -> выход из функции

    const setClauses = keys.map((key, i) => `${key} = $${i + 1}`);
    const values = keys.map(key => dto[key]);

    // условия WHERE
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

  async deleteStore(storeId: string, userId: string) {
    // проверка на наличие данного пользователя с магазином в бд
    await this.getById(storeId, userId);

    const result = await this.databaseService.query(`
      DELETE FROM stores
      WHERE id = $1
      RETURNING *;
    `, [storeId]);

    return result.rows[0];
  }
}
