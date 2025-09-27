import { Controller, Get, Query, Request } from "@nestjs/common";
import { CalendarService } from "./calendar.service";
import { PaginationOptions } from "src/common/interfaces/pagination.interface";

@Controller('calendar')
export class CalendarController {
    constructor(private readonly calendarService: CalendarService) {}

    @Get()
    async getEvents(
        // req: Request,
        @Query() query: Partial<PaginationOptions>
    ) {
        // const userId = req.user.id;
        const userId = '1';
        return this.calendarService.getEvents(userId, query);
    }
}
