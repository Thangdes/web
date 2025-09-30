import { Controller, Get, Post, Body, Query, HttpStatus, UseGuards } from "@nestjs/common";
import { EventService } from "./event.service";
import { CreateEventDto, EventResponseDto } from "./dto/events.dto";
import { MessageService } from "../../common/message/message.service";
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiCookieAuth, ApiExtraModels } from "@nestjs/swagger";
import { SuccessResponseDto, PaginatedResponseDto } from "../../common/dto/base-response.dto";
import { PaginationQueryDto } from "../../common/dto/pagination.dto";
import { JwtAuthGuard } from "../../common/guards/jwt-auth.guard";
import { CurrentUserId } from "../../common/decorators/current-user.decorator";
import { SwaggerExamples } from "../../common/swagger/swagger-examples";

@ApiTags('Events')
@ApiExtraModels(EventResponseDto, CreateEventDto, SuccessResponseDto, PaginatedResponseDto)
@Controller('calendar')
@UseGuards(JwtAuthGuard)
@ApiBearerAuth('bearer')
@ApiCookieAuth('cookie')
export class EventController {
    constructor(
        private readonly eventService: EventService,
        private readonly messageService: MessageService
    ) {}

    @Get()
    @ApiOperation({ 
        summary: '📅 Get user events with pagination',
        description: 'Retrieve paginated list of events with filtering and search'
    })
    @ApiResponse({ 
        status: 200, 
        description: '✅ Events retrieved successfully with pagination metadata',
        schema: {
            example: SwaggerExamples.Events.List.response
        }
    })
    @ApiResponse({ 
        status: 401, 
        description: '❌ Unauthorized - Invalid or expired token',
        schema: {
            example: SwaggerExamples.Errors.Unauthorized
        }
    })
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
    @ApiOperation({ 
        summary: '➕ Create a new event',
        description: 'Create a new calendar event with validation and RRULE support'
    })
    @ApiResponse({ 
        status: 201, 
        description: '✅ Event created successfully',
        schema: {
            example: SwaggerExamples.Events.Create.response
        }
    })
    @ApiResponse({ 
        status: 400, 
        description: '❌ Validation failed - Invalid input data',
        schema: {
            example: SwaggerExamples.Errors.ValidationError
        }
    })
    @ApiResponse({ 
        status: 401, 
        description: '❌ Unauthorized - Invalid or expired token',
        schema: {
            example: SwaggerExamples.Errors.Unauthorized
        }
    })
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
