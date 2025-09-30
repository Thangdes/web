import { Controller, Get, Post, Body, Query, Request, HttpStatus, UseGuards } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/events.dto";
import { MessageService } from "../../common/message/message.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from "@nestjs/swagger";
import { SuccessResponseDto, PaginatedResponseDto } from "../../common/dto/base-response.dto";
import { PaginationQueryDto } from "../../common/dto/pagination.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";

@ApiTags('Events')
@Controller('calendar')
// @UseGuards(JwtAuthGuard) // TODO: Uncomment when authentication is implemented
// @ApiBearerAuth()
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly messageService: MessageService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get user events with pagination' })
    @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
    async getEvents(
        @Request() req: any, // TODO: Replace with proper Request type when auth is implemented
        @Query() query: PaginationQueryDto
    ): Promise<PaginatedResponseDto> {
        // TODO: Get userId from authenticated user: const userId = req.user.id;
        const userId = '1'; // Temporary hardcoded value
        const result = await this.eventService.getEvents(userId, query);
        
        return new PaginatedResponseDto(
            this.messageService.get('success.retrieved'),
            result.data,
            result.meta
        );
    }

    @Post()
    @ApiOperation({ summary: 'Create a new event' })
    @ApiResponse({ status: 201, description: 'Event created successfully' })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async createEvent(
        @Body() createEventDto: CreateEventDto,
        @Request() req: any // TODO: Replace with proper Request type when auth is implemented
    ): Promise<SuccessResponseDto> {
        // TODO: Get userId from authenticated user: const userId = req.user.id;
        const userId = '1'; // Temporary hardcoded value
        const event = await this.eventService.createEvent(createEventDto, userId);
        
        return new SuccessResponseDto(
            this.messageService.get('calendar.event_created'),
            event,
            HttpStatus.CREATED
        );
    }
}
