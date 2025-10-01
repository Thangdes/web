import { Controller, Post, Get, Body, Param, UseGuards, Request, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiBody, ApiParam, ApiQuery } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';
import { CalendarSyncManagerService } from '../services/calendar-sync-manager.service';
import { CalendarValidationService, CalendarConnectionStatus } from '../../../common/services/calendar-validation.service';
import { SyncStrategy, InitialSyncResult, SyncConflict } from '../types/sync.types';

class InitialSyncDto {
    strategy?: SyncStrategy = SyncStrategy.MERGE_PREFER_TEMPRA;
}

class SetSyncEnabledDto {
    enabled: boolean;
}


@ApiTags('Calendar Sync')
@ApiBearerAuth()
@Controller('calendar/sync')
@UseGuards(JwtAuthGuard)
export class CalendarSyncController {
    constructor(
        private readonly syncManager: CalendarSyncManagerService,
        private readonly calendarValidation: CalendarValidationService
    ) {}

    @Post('initial')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'Thực hiện initial sync với Google Calendar',
        description: `
            Khi user lần đầu connect với Google Calendar, endpoint này sẽ:
            1. Lấy tất cả events từ cả Tempra và Google Calendar
            2. Phát hiện conflicts (events trùng lặp hoặc overlap)
            3. Xử lý conflicts theo strategy được chọn:
               - MERGE_PREFER_TEMPRA: Giữ events của Tempra, update lên Google
               - MERGE_PREFER_GOOGLE: Giữ events của Google, update Tempra
               - KEEP_BOTH: Giữ cả 2, import tất cả từ Google
            4. Import các events không conflict từ Google
            
            Recommended: MERGE_PREFER_TEMPRA (default)
        `
    })
    @ApiBody({ 
        type: InitialSyncDto,
        description: 'Strategy để xử lý conflicts',
        examples: {
            default: {
                summary: 'Ưu tiên Tempra (recommended)',
                value: { strategy: 'merge_prefer_tempra' }
            },
            google: {
                summary: 'Ưu tiên Google',
                value: { strategy: 'merge_prefer_google' }
            },
            both: {
                summary: 'Giữ cả 2',
                value: { strategy: 'keep_both' }
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Initial sync completed successfully',
        schema: {
            example: {
                totalGoogleEvents: 15,
                totalTempraEvents: 10,
                imported: 12,
                conflicts: [
                    {
                        tempraEventId: 'abc-123',
                        googleEventId: 'google-xyz',
                        reason: 'duplicate',
                        tempraEvent: { title: 'Meeting', start_time: '...' },
                        googleEvent: { summary: 'Meeting', start: { dateTime: '...' } }
                    }
                ],
                errors: []
            }
        }
    })
    @ApiResponse({ status: 401, description: 'Unauthorized - Token không hợp lệ' })
    @ApiResponse({ status: 400, description: 'User chưa connect với Google Calendar' })
    async performInitialSync(
        @Request() req: any,
        @Body() body: InitialSyncDto
    ): Promise<InitialSyncResult> {
        const userId = req.user.id;
        const strategy = body.strategy || SyncStrategy.MERGE_PREFER_TEMPRA;
        
        return this.syncManager.performInitialSync(userId, strategy);
    }

    @Get('status')
    @ApiOperation({ 
        summary: 'Lấy trạng thái sync với Google Calendar',
        description: 'Kiểm tra xem user có connect và enable sync với Google Calendar không'
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Sync status retrieved successfully',
        schema: {
            example: {
                isConnected: true,
                isSyncEnabled: true,
                lastSyncAt: '2024-01-15T10:30:00Z',
                connectionEstablishedAt: '2024-01-10T08:00:00Z'
            }
        }
    })
    async getSyncStatus(@Request() req: any): Promise<CalendarConnectionStatus> {
        const userId = req.user.id;
        return this.calendarValidation.getConnectionStatus(userId);
    }


    @Post('toggle')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'Bật/tắt sync với Google Calendar',
        description: `
            Enable hoặc disable automatic sync với Google Calendar.
            
            Khi DISABLE sync:
            - Events ở Tempra calendar giữ nguyên
            - Không sync events mới với Google
            - Không update events từ Google
            - User có thể enable lại bất cứ lúc nào
            
            Khi ENABLE lại:
            - Tự động sync events mới
            - Update events khi thay đổi
        `
    })
    @ApiBody({ 
        type: SetSyncEnabledDto,
        examples: {
            enable: {
                summary: 'Enable sync',
                value: { enabled: true }
            },
            disable: {
                summary: 'Disable sync',
                value: { enabled: false }
            }
        }
    })
    @ApiResponse({ status: 200, description: 'Sync setting updated successfully' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async setSyncEnabled(
        @Request() req: any,
        @Body() body: SetSyncEnabledDto
    ): Promise<{ message: string; syncEnabled: boolean }> {
        const userId = req.user.id;
        await this.calendarValidation.setSyncEnabled(userId, body.enabled);
        
        return {
            message: `Google Calendar sync ${body.enabled ? 'enabled' : 'disabled'} successfully`,
            syncEnabled: body.enabled
        };
    }

    @Post('disconnect')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'Disconnect Google Calendar',
        description: `
            Ngắt kết nối hoàn toàn với Google Calendar.
            
            Hệ thống sẽ:
            1. Giữ nguyên TẤT CẢ events ở Tempra calendar
            2. Xóa mapping với Google Calendar (google_event_id)
            3. Đánh dấu connection là inactive
            4. Không thể sync cho đến khi reconnect
            
            Note: Events ở Google Calendar KHÔNG bị xóa
        `
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Disconnected successfully, local events preserved',
        schema: {
            example: {
                message: 'Google Calendar disconnected successfully. All local events preserved.',
                eventsPreserved: true
            }
        }
    })
    async disconnectGoogleCalendar(@Request() req: any): Promise<{ 
        message: string; 
        eventsPreserved: boolean 
    }> {
        const userId = req.user.id;
        await this.syncManager.handleDisconnection(userId);
        
        return {
            message: 'Google Calendar disconnected successfully. All local events preserved.',
            eventsPreserved: true
        };
    }

    @Get('conflicts')
    @ApiOperation({ 
        summary: 'Lấy danh sách conflicts chưa resolve',
        description: 'Xem các conflicts phát hiện được trong quá trình sync'
    })
    @ApiQuery({ name: 'resolved', required: false, description: 'Filter by resolved status' })
    @ApiResponse({ 
        status: 200, 
        description: 'Conflicts retrieved successfully',
        schema: {
            example: [
                {
                    tempraEventId: 'abc-123',
                    googleEventId: 'google-xyz',
                    reason: 'duplicate',
                    tempraEvent: {
                        id: 'abc-123',
                        title: 'Team Meeting',
                        start_time: '2024-01-15T10:00:00Z',
                        end_time: '2024-01-15T11:00:00Z'
                    },
                    googleEvent: {
                        id: 'google-xyz',
                        summary: 'Team Meeting',
                        start: { dateTime: '2024-01-15T10:00:00Z' },
                        end: { dateTime: '2024-01-15T11:00:00Z' }
                    },
                    resolution: 'merge_prefer_tempra',
                    resolved: false,
                    createdAt: '2024-01-15T08:00:00Z',
                    resolvedAt: null
                }
            ]
        }
    })
    async getConflicts(
        @Request() req: any,
        @Query('resolved') resolved?: boolean
    ): Promise<any[]> {
        const userId = req.user.id;
        return this.syncManager.getConflicts(userId, resolved);
    }

    @Post('conflicts/:conflictId/resolve')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({ 
        summary: 'Resolve một conflict manually',
        description: 'Đánh dấu một conflict đã được xử lý manually'
    })
    @ApiParam({ name: 'conflictId', description: 'ID của conflict cần resolve' })
    @ApiBody({
        schema: {
            properties: {
                resolution: {
                    type: 'string',
                    description: 'Cách giải quyết conflict',
                    example: 'manual_merge'
                }
            }
        }
    })
    @ApiResponse({ 
        status: 200, 
        description: 'Conflict resolved successfully',
        schema: {
            example: {
                message: 'Conflict resolved successfully',
                conflictId: 'conf-123'
            }
        }
    })
    async resolveConflict(
        @Request() req: any,
        @Param('conflictId') conflictId: string,
        @Body() body: { resolution: string }
    ): Promise<{ message: string; conflictId: string }> {
        const userId = req.user.id;
        await this.syncManager.resolveConflict(userId, conflictId, body.resolution);
        
        return {
            message: 'Conflict resolved successfully',
            conflictId
        };
    }
}
