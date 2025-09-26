import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { User, CreateUserDto, UpdateUserDto } from './user.entity';

@Injectable()
export class UserRepository {
  private readonly logger = new Logger(UserRepository.name);

  constructor(private readonly databaseService: DatabaseService) {}

  async create(userData: CreateUserDto): Promise<User> {
    const query = `
      INSERT INTO users (email, username, password_hash, first_name, last_name)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;

    const values = [
      userData.email,
      userData.username,
      userData.password_hash,
      userData.first_name || null,
      userData.last_name || null,
    ];

    try {
      const result = await this.databaseService.query<User>(query, values);
      this.logger.log(`Created user with ID: ${result.rows[0].id}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error('Failed to create user:', error.message);
      throw error;
    }
  }

  async findById(id: number): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE id = $1';
    
    try {
      const result = await this.databaseService.query<User>(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      this.logger.error(`Failed to find user by ID ${id}:`, error.message);
      throw error;
    }
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE email = $1';
    
    try {
      const result = await this.databaseService.query<User>(query, [email]);
      return result.rows[0] || null;
    } catch (error) {
      this.logger.error(`Failed to find user by email ${email}:`, error.message);
      throw error;
    }
  }

  async findByUsername(username: string): Promise<User | null> {
    const query = 'SELECT * FROM users WHERE username = $1';
    
    try {
      const result = await this.databaseService.query<User>(query, [username]);
      return result.rows[0] || null;
    } catch (error) {
      this.logger.error(`Failed to find user by username ${username}:`, error.message);
      throw error;
    }
  }

  async update(id: number, userData: UpdateUserDto): Promise<User | null> {
    const fields: string[] = [];
    const values: any[] = [];
    let paramCount = 1;

    Object.entries(userData).forEach(([key, value]) => {
      if (value !== undefined) {
        fields.push(`${key} = $${paramCount}`);
        values.push(value);
        paramCount++;
      }
    });

    if (fields.length === 0) {
      throw new Error('No fields to update');
    }

    const query = `
      UPDATE users 
      SET ${fields.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $${paramCount}
      RETURNING *
    `;
    values.push(id);

    try {
      const result = await this.databaseService.query<User>(query, values);
      if (result.rows.length === 0) {
        return null;
      }
      
      this.logger.log(`Updated user with ID: ${id}`);
      return result.rows[0];
    } catch (error) {
      this.logger.error(`Failed to update user ${id}:`, error.message);
      throw error;
    }
  }

  async softDelete(id: number): Promise<boolean> {
    const query = `
      UPDATE users 
      SET is_active = false, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING id
    `;

    try {
      const result = await this.databaseService.query(query, [id]);
      const deleted = result.rows.length > 0;
      
      if (deleted) {
        this.logger.log(`Soft deleted user with ID: ${id}`);
      }
      
      return deleted;
    } catch (error) {
      this.logger.error(`Failed to soft delete user ${id}:`, error.message);
      throw error;
    }
  }

  async hardDelete(id: number): Promise<boolean> {
    const query = 'DELETE FROM users WHERE id = $1 RETURNING id';

    try {
      const result = await this.databaseService.query(query, [id]);
      const deleted = result.rows.length > 0;
      
      if (deleted) {
        this.logger.log(`Hard deleted user with ID: ${id}`);
      }
      
      return deleted;
    } catch (error) {
      this.logger.error(`Failed to hard delete user ${id}:`, error.message);
      throw error;
    }
  }


  async findAll(page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    
    const countQuery = 'SELECT COUNT(*) FROM users WHERE is_active = true';
    const dataQuery = `
      SELECT * FROM users 
      WHERE is_active = true 
      ORDER BY created_at DESC 
      LIMIT $1 OFFSET $2
    `;

    try {
      const [countResult, dataResult] = await Promise.all([
        this.databaseService.query(countQuery),
        this.databaseService.query<User>(dataQuery, [limit, offset])
      ]);

      return {
        users: dataResult.rows,
        total: parseInt(countResult.rows[0].count)
      };
    } catch (error) {
      this.logger.error('Failed to find all users:', error.message);
      throw error;
    }
  }

  async search(searchTerm: string, page: number = 1, limit: number = 10): Promise<{ users: User[]; total: number }> {
    const offset = (page - 1) * limit;
    const searchPattern = `%${searchTerm}%`;
    
    const countQuery = `
      SELECT COUNT(*) FROM users 
      WHERE is_active = true 
      AND (email ILIKE $1 OR username ILIKE $1)
    `;
    
    const dataQuery = `
      SELECT * FROM users 
      WHERE is_active = true 
      AND (email ILIKE $1 OR username ILIKE $1)
      ORDER BY created_at DESC 
      LIMIT $2 OFFSET $3
    `;

    try {
      const [countResult, dataResult] = await Promise.all([
        this.databaseService.query(countQuery, [searchPattern]),
        this.databaseService.query<User>(dataQuery, [searchPattern, limit, offset])
      ]);

      return {
        users: dataResult.rows,
        total: parseInt(countResult.rows[0].count)
      };
    } catch (error) {
      this.logger.error('Failed to search users:', error.message);
      throw error;
    }
  }
}
