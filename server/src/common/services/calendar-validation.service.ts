import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { MessageService } from '../message/message.service';

@Injectable()
export class CalendarValidationService {
    constructor(
        private databaseService: DatabaseService,
        private messageService: MessageService
    ) {}

    async validateCalendarExists(userId: string): Promise<void> {
        // Check if user has Google Calendar connection
        const calendarQuery = 'SELECT * FROM user_calendar_connections WHERE user_id = $1 AND provider = $2';
        const calendarParams = [userId, 'google'];

        try {
            const calendarResult = await this.databaseService.query(calendarQuery, calendarParams);
            
            if (calendarResult.rows.length === 0) {
                // Case 1: User not connected to Google Calendar
                // For now, we'll allow event creation without Google Calendar sync
                // In the future, this could redirect to Google Calendar connection flow
                return;
            }

            // Case 2: User is connected to Google Calendar
            const connection = calendarResult.rows[0];
            
            // Check if connection is still valid (not expired)
            if (connection.expires_at && new Date(connection.expires_at) < new Date()) {
                throw new Error(this.messageService.get('calendar.sync_failed'));
            }

            // TODO: Future implementation - Check for sync conflicts
            // await this.checkSyncConflicts(userId, connection);
            
        } catch (error) {
            if (error.message === this.messageService.get('calendar.sync_failed')) {
                throw error;
            }
            // If calendar validation fails, we still allow event creation
            // This ensures the system works even without Google Calendar integration
            console.warn(`Calendar validation warning for user ${userId}: ${error.message}`);
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
                console.warn(`Potential sync conflicts detected for user ${userId}`);
                // Future: Implement conflict resolution logic
            }
        } catch (error) {
            console.warn(`Sync log check failed for user ${userId}: ${error.message}`);
        }
    }

    async isUserConnectedToCalendar(userId: string): Promise<boolean> {
        const query = 'SELECT 1 FROM user_calendar_connections WHERE user_id = $1 AND provider = $2 LIMIT 1';
        const params = [userId, 'google'];

        try {
            const result = await this.databaseService.query(query, params);
            return result.rows.length > 0;
        } catch (error) {
            return false;
        }
    }

    async getCalendarConnection(userId: string): Promise<any> {
        const query = 'SELECT * FROM user_calendar_connections WHERE user_id = $1 AND provider = $2';
        const params = [userId, 'google'];

        try {
            const result = await this.databaseService.query(query, params);
            return result.rows[0] || null;
        } catch (error) {
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }
}
