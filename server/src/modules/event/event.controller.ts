import { Controller, Get, Post, Body, Query, Request, HttpStatus } from "@nestjs/common";
import { EventService } from "./event.service";
import { PaginationOptions } from "src/common/interfaces/pagination.interface";
import { CreateEventDto } from "./dto/events.dto";
import { MessageService } from "src/common/message/message.service";

@Controller('calendar')
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly messageService: MessageService
    ) {}

    @Get()
    async getEvents(
        // req: Request,
        @Query() query: Partial<PaginationOptions>
    ) {
        // const userId = req.user.id;
        const userId = '1';
        const events = await this.eventService.getEvents(userId, query);
        
        return {
            status: HttpStatus.OK,
            message: this.messageService.get('success.retrieved'),
            data: events
        };
    }

    @Post()
    async createEvent(
        @Body() createEventDto: CreateEventDto
        // req: Request
    ) {
        // const userId = req.user.id;
        const userId = '1';
        const event = await this.eventService.createEvent(createEventDto, userId);
        
        return {
            status: HttpStatus.CREATED,
            message: this.messageService.get('calendar.event_created'),
            data: event
        };
    }
}
