import { Injectable } from "@nestjs/common";
import { PaginatedResult } from "../../common/interfaces/pagination.interface";
import { Event } from "./event";
import { PaginationOptions } from "../../common/interfaces/pagination.interface";
import { CreateEventDto } from "./dto/events.dto";
import { EventRepository } from "./event.repository";

@Injectable()
export class EventService {
    constructor(
        private eventRepository: EventRepository
    ) {}

    async createEvent(eventDto: CreateEventDto, userId: string): Promise<Event> {
       return this.eventRepository.createEvent(eventDto, userId);
    }

    async updateEvent(eventId: string, eventDto: CreateEventDto, userId: string): Promise<Event> {
        return this.eventRepository.updateEvent(eventId, eventDto, userId);
    }

    async deleteEvent(eventId: string, userId: string): Promise<boolean> {
        return this.eventRepository.deleteEvent(eventId, userId);
    }

    async searchEvents(
        userId: string, 
        searchTerm: string, 
        paginationOptions: Partial<PaginationOptions>
    ): Promise<PaginatedResult<Event>> {
        return this.eventRepository.searchEvents(userId, searchTerm, paginationOptions);
    }
    
    async getEventById(eventId: string, userId: string): Promise<Event | null> {
        return this.eventRepository.getEventById(eventId, userId);
    }

    async getEvents(
        userId: string,
        options: Partial<PaginationOptions>
    ): Promise<PaginatedResult<Event>> {
        return this.eventRepository.getEvents(userId, options);
    }

    async getEventsByDateRange(
        userId: string, 
        startDate: Date, 
        endDate: Date, 
        options: Partial<PaginationOptions>
    ): Promise<PaginatedResult<Event>> {
        return this.eventRepository.findByUserIdAndDateRange(userId, startDate, endDate, options);
    }

}