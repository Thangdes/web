import { Injectable } from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { PaginationService } from 'src/common/services/pagination.service';
import { PaginatedResult, PaginationOptions } from 'src/common/interfaces/pagination.interface';
import { Event } from './event';
import { CreateEventDto } from './dto/events.dto';
import { UserValidationService } from 'src/common/services/user-validation.service';
import { CalendarValidationService } from 'src/common/services/calendar-validation.service';
import { MessageService } from 'src/common/message/message.service';
import { EventCreationFailedException } from './exceptions/event.exceptions';
import { UserOwnedRepository } from 'src/common/repositories/base.repository';

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
}
