import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';

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
}
