import { Injectable, Logger } from '@nestjs/common';
import { EventRepository } from '../event.repository';
import { GoogleCalendarService } from '../../google/services/google-calendar.service';
import { GoogleAuthService } from '../../google/services/google-auth.service';
import { CalendarValidationService } from '../../../common/services/calendar-validation.service';
import { Event } from '../event';
import { CreateEventDto } from '../dto/events.dto';

@Injectable()
export class EventSyncService {
    private readonly logger = new Logger(EventSyncService.name);

    constructor(
        private readonly eventRepository: EventRepository,
        private readonly googleCalendarService: GoogleCalendarService,
        private readonly googleAuthService: GoogleAuthService,
        private readonly calendarValidationService: CalendarValidationService
    ) {}

    async createEventWithSync(
        eventDto: CreateEventDto,
        userId: string,
        options?: { skipGoogleSync?: boolean }
    ): Promise<{ event: Event; syncedToGoogle: boolean; googleEventId?: string }> {
        const event = await this.eventRepository.createEvent(eventDto, userId);
        this.logger.log(`Created local event ${event.id} for user ${userId}`);

        if (options?.skipGoogleSync) {
            return { event, syncedToGoogle: false };
        }

        const isConnected = await this.calendarValidationService.isUserConnectedToCalendar(userId);
        
        if (!isConnected) {
            this.logger.log(`User ${userId} not connected to Google - event created locally only`);
            return { event, syncedToGoogle: false };
        }

        try {
            const googleEvent = await this.googleCalendarService.createEvent(
                userId,
                'primary',
                {
                    summary: event.title,
                    description: event.description,
                    start: event.start_time,
                    end: event.end_time,
                    location: event.location
                }
            );

            this.logger.log(`Synced event ${event.id} to Google Calendar: ${googleEvent.id}`);

            return {
                event,
                syncedToGoogle: true,
                googleEventId: googleEvent.id || undefined
            };
        } catch (error) {
            this.logger.error(`Failed to sync event ${event.id} to Google:`, error);
            return { event, syncedToGoogle: false };
        }
    }

    async updateEventWithSync(
        eventId: string,
        eventDto: CreateEventDto,
        userId: string,
        googleEventId?: string
    ): Promise<{ event: Event; syncedToGoogle: boolean }> {
        const event = await this.eventRepository.updateEvent(eventId, eventDto, userId);
        this.logger.log(`Updated local event ${eventId}`);

        const isConnected = await this.calendarValidationService.isUserConnectedToCalendar(userId);
        
        if (!isConnected || !googleEventId) {
            return { event, syncedToGoogle: false };
        }

        try {
            await this.googleCalendarService.updateEvent(
                userId,
                'primary',
                googleEventId,
                {
                    summary: event.title,
                    description: event.description,
                    start: event.start_time,
                    end: event.end_time,
                    location: event.location
                }
            );

            this.logger.log(`Synced update for event ${eventId} to Google`);
            return { event, syncedToGoogle: true };
        } catch (error) {
            this.logger.error(`Failed to sync update to Google:`, error);
            return { event, syncedToGoogle: false };
        }
    }

    async deleteEventWithSync(
        eventId: string,
        userId: string,
        googleEventId?: string
    ): Promise<{ deleted: boolean; deletedFromGoogle: boolean }> {
        const deleted = await this.eventRepository.deleteEvent(eventId, userId);
        
        if (!deleted) {
            return { deleted: false, deletedFromGoogle: false };
        }

        this.logger.log(`Deleted local event ${eventId}`);

        const isConnected = await this.calendarValidationService.isUserConnectedToCalendar(userId);
        
        if (!isConnected || !googleEventId) {
            return { deleted: true, deletedFromGoogle: false };
        }

        try {
            const deletedFromGoogle = await this.googleCalendarService.deleteEvent(
                userId,
                'primary',
                googleEventId
            );

            this.logger.log(`Deleted event ${eventId} from Google Calendar`);
            return { deleted: true, deletedFromGoogle };
        } catch (error) {
            this.logger.error(`Failed to delete from Google:`, error);
            return { deleted: true, deletedFromGoogle: false };
        }
    }

    async pullEventsFromGoogle(
        userId: string,
        options?: {
            timeMin?: Date;
            timeMax?: Date;
            maxResults?: number;
        }
    ): Promise<{ synced: number; errors: string[] }> {
        const isConnected = await this.googleAuthService.isConnected(userId);
        
        if (!isConnected) {
            throw new Error('User not connected to Google Calendar');
        }

        try {
            const googleEvents = await this.googleCalendarService.listEvents(
                userId,
                'primary',
                options
            );

            this.logger.log(`Fetched ${googleEvents.length} events from Google for user ${userId}`);

            const errors: string[] = [];
            let syncedCount = 0;

            for (const googleEvent of googleEvents) {
                try {
                    if (!googleEvent.start?.dateTime || !googleEvent.end?.dateTime) {
                        continue;
                    }

                    const eventDto: CreateEventDto = {
                        title: googleEvent.summary || 'Untitled Event',
                        description: googleEvent.description ?? undefined,
                        start_time: new Date(googleEvent.start.dateTime).toISOString(),
                        end_time: new Date(googleEvent.end.dateTime).toISOString(),
                        location: googleEvent.location ?? undefined,
                        is_all_day: false,
                        recurrence_rule: googleEvent.recurrence?.[0] ?? undefined
                    };

                    await this.eventRepository.createEvent(eventDto, userId);
                    syncedCount++;
                } catch (error) {
                    errors.push(`Failed to sync event ${googleEvent.id}: ${error.message}`);
                }
            }

            this.logger.log(`Synced ${syncedCount}/${googleEvents.length} events from Google`);

            return { synced: syncedCount, errors };
        } catch (error) {
            this.logger.error(`Failed to pull events from Google:`, error);
            throw new Error('Failed to sync events from Google Calendar');
        }
    }

    async shouldSyncToGoogle(userId: string): Promise<boolean> {
        return this.calendarValidationService.isUserConnectedToCalendar(userId);
    }

    async getSyncStatus(userId: string): Promise<{
        connectedToGoogle: boolean;
        canSync: boolean;
        lastSyncAt?: Date;
    }> {
        const connectedToGoogle = await this.calendarValidationService.isUserConnectedToCalendar(userId);

        return {
            connectedToGoogle,
            canSync: connectedToGoogle,
            lastSyncAt: undefined
        };
    }
}
