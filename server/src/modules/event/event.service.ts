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

    async getEvents(
        userId: string,
        options: Partial<PaginationOptions>
    ): Promise<PaginatedResult<Event>> {
        return this.eventRepository.getEvents(userId, options);
    }
    
}