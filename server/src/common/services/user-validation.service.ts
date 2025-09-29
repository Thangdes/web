import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class UserValidationService {
    constructor(
        private databaseService: DatabaseService,
        private messageService: MessageService
    ) {}

    async validateUserExists(userId: string): Promise<void> {
        const query = 'SELECT id FROM users WHERE id = $1';
        const params = [userId];

        try {
            const result = await this.databaseService.query(query, params);
            if (result.rows.length === 0) {
                throw new Error(this.messageService.get('user.not_found'));
            }
        } catch (error) {
            if (error.message === this.messageService.get('user.not_found')) {
                throw error;
            }
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }

    async validateAndGetUser(userId: string): Promise<any> {
        const query = 'SELECT * FROM users WHERE id = $1';
        const params = [userId];

        try {
            const result = await this.databaseService.query(query, params);
            if (result.rows.length === 0) {
                throw new Error(this.messageService.get('user.not_found'));
            }
            return result.rows[0];
        } catch (error) {
            if (error.message === this.messageService.get('user.not_found')) {
                throw error;
            }
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }

    async validateMultipleUsers(userIds: string[]): Promise<string[]> {
        if (userIds.length === 0) {
            return [];
        }

        const placeholders = userIds.map((_, index) => `$${index + 1}`).join(', ');
        const query = `SELECT id FROM users WHERE id IN (${placeholders})`;

        try {
            const result = await this.databaseService.query(query, userIds);
            return result.rows.map(row => row.id);
        } catch (error) {
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }

    async userExists(userId: string): Promise<boolean> {
        const query = 'SELECT 1 FROM users WHERE id = $1 LIMIT 1';
        const params = [userId];

        try {
            const result = await this.databaseService.query(query, params);
            return result.rows.length > 0;
        } catch (error) {
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }
}
