import { Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {
  }

  async findUserById(id: string) {
    const user = await this.databaseService.query('SELECT * FROM users WHERE id = $1', [id]);
    if (!user.rows.length) {
      throw new NotFoundException('User not found');
    }
    return user.rows[0];
  }

  async findUserByEmail(email: string) {
    const user = await this.databaseService.query(`
        SELECT * FROM users WHERE email = $1
      `,
      [email],
    );
    if (!user.rows.length) {
      throw new NotFoundException('User not found');
    }
    return user.rows[0];
  }

  async createUser(email: string, password: string) {
    const hashedPassword = await hash(password) || '';

    try {
      const result = await this.databaseService.query(
        'INSERT INTO users(email, password) VALUES($1, $2) RETURNING *',
        [email, hashedPassword],
      );
      return result.rows[0];
    } catch (error) {
      throw error;
    }
  }
}
