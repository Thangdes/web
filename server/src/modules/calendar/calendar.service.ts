import { Injectable } from "@nestjs/common";
import { PaginatedResult } from "src/common/interfaces/pagination.interface";
import { DatabaseService } from "src/database/database.service";
import { CalendarEvent } from "./calendar.entity";
import { PaginationOptions } from "src/common/interfaces/pagination.interface";
import { PaginationService } from "src/common/services/pagination.service";

@Injectable()
export class CalendarService {
    constructor(
        private databaseService: DatabaseService,
        private paginationService: PaginationService
    ) {}

    async getEvents(
        userId: string,
        options: Partial<PaginationOptions>
    ) : Promise<PaginatedResult<CalendarEvent>> {
        const validatedOptions = this.paginationService.validatePaginationOptions(options);
        const {page, limit} = validatedOptions;

        const allowedSortFields = ['created_at', 'updated_at', 'start_time', 'end_time', 'title'];
        const baseQuery = 'SELECT * FROM events';
        const whereCondition = 'user_id = $1';
        const whereParams = [userId];

        const {countQuery, dataQuery, countParams, dataParams} = this.paginationService.buildPaginatedQuery(
            baseQuery,
            validatedOptions,
            allowedSortFields,
            whereCondition,
            whereParams
        )

        try {
            const [countResult, dataResult] = await Promise.all([
                this.databaseService.query(countQuery, countParams),
                this.databaseService.query<CalendarEvent>(dataQuery, dataParams)
            ])

            const total = parseInt(countResult.rows[0].count);
            const events = dataResult.rows;

            return this.paginationService.createPaginatedResult(events, page, limit, total);
        } catch (error) {
            throw new Error(`Failed to get events: ${error.message}`);
        }
    }
    
}