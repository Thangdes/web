import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginatedResult, PaginationOptions } from 'src/common/interfaces/pagination.interface';
import { Event } from './event';
import { CreateEventDto } from './dto/events.dto';
import { UserValidationService } from 'src/common/services/user-validation.service';
import { CalendarValidationService } from 'src/common/services/calendar-validation.service';
import { MessageService } from 'src/common/message/message.service';

@Injectable()
export class EventRepository {
    constructor(
        private databaseService: DatabaseService,
        private paginationService: PaginationService,
        private userValidationService: UserValidationService,
        private calendarValidationService: CalendarValidationService,
        private messageService: MessageService
    ) {}

    async createEvent(eventDto: CreateEventDto, userId: string): Promise<Event> {
        await this.userValidationService.validateUserExists(userId);
        await this.calendarValidationService.validateCalendarExists(userId);

        const query = 'INSERT INTO events (user_id, title, description, start_time, end_time, location, is_all_day, recurrence_rule) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *';
        const params = [userId, eventDto.title, eventDto.description, eventDto.start_time, eventDto.end_time, eventDto.location, eventDto.is_all_day, eventDto.recurrence_rule];
        
        try {
            const result = await this.databaseService.query<Event>(query, params);
            return result.rows[0];
        } catch (error) {
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }


    async getEvents(
        userId: string,
        options: Partial<PaginationOptions>
    ): Promise<PaginatedResult<Event>> {
        await this.userValidationService.validateUserExists(userId);
        const validatedOptions = this.paginationService.validatePaginationOptions(options);
        const { page, limit } = validatedOptions;

        const allowedSortFields = ['created_at', 'updated_at', 'start_time', 'end_time', 'title'];
        const baseQuery = 'SELECT * FROM events';
        const whereCondition = 'user_id = $1';
        const whereParams = [userId];

        const { countQuery, dataQuery, countParams, dataParams } = this.paginationService.buildPaginatedQuery(
            baseQuery,
            validatedOptions,
            allowedSortFields,
            whereCondition,
            whereParams
        );

        try {
            const [countResult, dataResult] = await Promise.all([
                this.databaseService.query(countQuery, countParams),
                this.databaseService.query<Event>(dataQuery, dataParams)
            ]);

            const total = parseInt(countResult.rows[0].count);
            const events = dataResult.rows;

            return this.paginationService.createPaginatedResult(events, page, limit, total);
        } catch (error) {
            throw new Error(this.messageService.get('error.internal_server_error'));
        }
    }
}
