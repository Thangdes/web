import { Controller, Get, Post, Body, Query, HttpStatus, UseGuards } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto } from "./dto/events.dto";
import { MessageService } from "../../common/message/message.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCookieAuth } from "@nestjs/swagger";
import { SuccessResponseDto, PaginatedResponseDto } from "../../common/dto/base-response.dto";
import { PaginationQueryDto } from "../../common/dto/pagination.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUserId } from "../../common/decorators/current-user.decorator";

@ApiTags('Events')
@Controller('calendar')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@ApiCookieAuth()
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly messageService: MessageService
    ) {}

    @Get()
    @ApiOperation({ summary: 'Get user events with pagination' })
    @ApiResponse({ status: 200, description: 'Events retrieved successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async getEvents(
        @CurrentUserId() userId: string,
        @Query() query: PaginationQueryDto
    ): Promise<PaginatedResponseDto> {
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
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async createEvent(
        @Body() createEventDto: CreateEventDto,
        @CurrentUserId() userId: string
    ): Promise<SuccessResponseDto> {
        const event = await this.eventService.createEvent(createEventDto, userId);
        
        return new SuccessResponseDto(
            this.messageService.get('calendar.event_created'),
            event,
            HttpStatus.CREATED
        );
    }
}
