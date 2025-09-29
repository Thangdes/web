import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { CommonModule } from './common/common.module';
import { HealthModule } from './modules/health/health.module';
import { CalendarModule } from './modules/event/event.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    CommonModule,
    DatabaseModule,
    HealthModule,
    UsersModule,
    CalendarModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
