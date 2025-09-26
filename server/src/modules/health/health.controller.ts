import { Controller, Get } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';

@Controller('health')
export class HealthController {
  constructor(private readonly databaseService: DatabaseService) {}

  @Get()
  async check() {
    const dbHealth = await this.databaseService.healthCheck();
    const dbStats = await this.databaseService.getStats();

    return {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: {
        connected: dbHealth,
        stats: dbStats,
      },
      memory: process.memoryUsage(),
      version: process.version,
    };
  }

  @Get('db')
  async database() {
    const isHealthy = await this.databaseService.healthCheck();
    const stats = await this.databaseService.getStats();

    return {
      status: isHealthy ? 'healthy' : 'unhealthy',
      stats,
      timestamp: new Date().toISOString(),
    };
  }
}
