import { Module } from "@nestjs/common";
import { EventController } from "./event.controller";
import { EventService } from "./event.service";
import { EventRepository } from "./event.repository";
import { DatabaseModule } from "../../database/database.module";

@Module({
    imports: [DatabaseModule],
    controllers: [EventController],
    providers: [EventService, EventRepository],
    exports: [],
})
export class EventModule {}