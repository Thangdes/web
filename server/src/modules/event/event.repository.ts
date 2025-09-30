import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { PaginationService } from '../../common/services/pagination.service';
import { PaginatedResult, PaginationOptions } from '../../common/interfaces/pagination.interface';
import { Event } from './event';
import { CreateEventDto } from './dto/events.dto';
import { UserValidationService } from '../../common/services/user-validation.service';
import { CalendarValidationService } from '../../common/services/calendar-validation.service';
import { MessageService } from '../../common/message/message.service';
import { EventCreationFailedException } from './exceptions/event.exceptions';
import { UserOwnedRepository } from '../../common/repositories/base.repository';

@Injectable()
export class EventRepository extends UserOwnedRepository<Event> {
    constructor(
        databaseService: DatabaseService,
        paginationService: PaginationService,
        messageService: MessageService,
        private userValidationService: UserValidationService,
        private calendarValidationService: CalendarValidationService
    ) {
        super(databaseService, paginationService, messageService, 'events');
    }

    protected getAllowedSortFields(): string[] {
        return ['created_at', 'updated_at', 'start_time', 'end_time', 'title'];
    }

    async createEvent(eventDto: CreateEventDto, userId: string): Promise<Event> {
        await this.userValidationService.validateUserExists(userId);
        await this.calendarValidationService.validateCalendarExists(userId);

        const eventData: Partial<Event> = {
            user_id: userId,
            title: eventDto.title,
            description: eventDto.description,
            start_time: new Date(eventDto.start_time),
            end_time: new Date(eventDto.end_time),
            location: eventDto.location,
            is_all_day: eventDto.is_all_day || false,
            recurrence_rule: eventDto.recurrence_rule
        };
        
        try {
            return await this.create(eventData);
        } catch (error) {
            throw new EventCreationFailedException(this.messageService.get('error.internal_server_error'));
        }
    }

    async getEvents(
        userId: string,
        options: Partial<PaginationOptions>
    ): Promise<PaginatedResult<Event>> {
        await this.userValidationService.validateUserExists(userId);
        
        try {
            return await this.findByUserId(userId, options);
        } catch (error) {
            throw new EventCreationFailedException(this.messageService.get('error.internal_server_error'));
        }
    }

    /**
     * Search events by title or description for a specific user using base search method
     */
    async searchEvents(
        userId: string, 
        searchTerm: string, 
        paginationOptions: Partial<PaginationOptions>
    ): Promise<PaginatedResult<Event>> {
        await this.userValidationService.validateUserExists(userId);
        
        const searchPattern = `%${searchTerm}%`;
        const whereCondition = 'user_id = $1 AND (title ILIKE $2 OR description ILIKE $2)';
        const whereParams = [userId, searchPattern];

        try {
            return await this.search(whereCondition, whereParams, paginationOptions);
        } catch (error) {
            this.logger.error('Failed to search events:', error);
            throw new EventCreationFailedException(this.messageService.get('error.internal_server_error'));
        }
    }
}
