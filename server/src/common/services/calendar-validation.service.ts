import { Injectable, Logger } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { MessageService } from '../message/message.service';
import { CalendarSyncException } from '../../modules/event/exceptions/event.exceptions';

@Injectable()
export class CalendarValidationService {
    private readonly logger = new Logger(CalendarValidationService.name);

    constructor(
        private databaseService: DatabaseService,
        private messageService: MessageService
    ) {}

    async validateCalendarExists(userId: string): Promise<void> {
        const calendarQuery = 'SELECT * FROM user_credentials WHERE user_id = $1 AND provider = $2';
        const calendarParams = [userId, 'google'];

        try {
            const calendarResult = await this.databaseService.query(calendarQuery, calendarParams);
            
            if (calendarResult.rows.length === 0) {
                this.logger.log(`User ${userId} not connected to Google Calendar - allowing local event creation`);
                return;
            }

            const connection = calendarResult.rows[0];
            
            if (connection.expires_at && new Date(connection.expires_at) < new Date()) {
                this.logger.warn(`Google Calendar token expired for user ${userId} - auto-refresh will be attempted`);
                return;
            }

            this.logger.log(`User ${userId} has valid Google Calendar connection`);
            
        } catch (error) {
            if (error instanceof CalendarSyncException) {
                throw error;
            }
            this.logger.warn(`Calendar validation warning for user ${userId}: ${error.message}`);
        }
    }

    // Future implementation for sync conflict detection
    private async checkSyncConflicts(userId: string, connection: any): Promise<void> {
        // Check sync_log for potential conflicts
        const syncLogQuery = `
            SELECT * FROM sync_log 
            WHERE user_id = $1 
            AND provider = $2 
            AND status = 'pending'
            ORDER BY created_at DESC
            LIMIT 10
        `;
        const syncLogParams = [userId, 'google'];

        try {
            const syncResult = await this.databaseService.query(syncLogQuery, syncLogParams);
            
            if (syncResult.rows.length > 0) {
                // Log potential conflicts but don't block event creation
                this.logger.warn(`Potential sync conflicts detected for user ${userId}`);
                // Future: Implement conflict resolution logic
            }
        } catch (error) {
            this.logger.warn(`Sync log check failed for user ${userId}: ${error.message}`);
        }
    }

    async isUserConnectedToCalendar(userId: string): Promise<boolean> {
        const query = 'SELECT 1 FROM user_credentials WHERE user_id = $1 AND provider = $2 LIMIT 1';
        const params = [userId, 'google'];

        try {
            const result = await this.databaseService.query(query, params);
            return result.rows.length > 0;
        } catch (error) {
            return false;
        }
    }

    async getCalendarConnection(userId: string): Promise<any> {
        const query = 'SELECT * FROM user_credentials WHERE user_id = $1 AND provider = $2';
        const params = [userId, 'google'];

        try {
            const result = await this.databaseService.query(query, params);
            return result.rows[0] || null;
        } catch (error) {
            this.logger.error(`Failed to get calendar connection for user ${userId}:`, error);
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }
}
