import { Controller, Get, Post, Put, Delete, Body, Param, Query, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, UserResponseDto } from './dto/user.dto';
import { MessageService } from '../../common/message/message.service';
import { SuccessResponseDto, PaginatedResponseDto } from '../../common/dto/base-response.dto';
import { PaginationQueryDto, SearchPaginationQueryDto } from '../../common/dto/pagination.dto';

@ApiTags('Users')
@Controller('users')
export class UserController {
    constructor(
        private readonly userService: UserService,
        private readonly messageService: MessageService
    ) {}

    @Post()
    @ApiOperation({ summary: 'Create a new user' })
    @ApiResponse({ status: 201, description: 'User created successfully', type: UserResponseDto })
    @ApiResponse({ status: 400, description: 'Invalid input data' })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<SuccessResponseDto<UserResponseDto>> {
        const user = await this.userService.createUser(createUserDto);
        
        // Remove password_hash from response
        const { password_hash, ...userResponse } = user;
        
        return new SuccessResponseDto(
            this.messageService.get('user.created'),
            userResponse as UserResponseDto,
            HttpStatus.CREATED
        );
    }

    @Get()
    @ApiOperation({ summary: 'Get all users with pagination' })
    @ApiResponse({ status: 200, description: 'Users retrieved successfully' })
    async getUsers(@Query() query: PaginationQueryDto): Promise<PaginatedResponseDto<UserResponseDto>> {
        const result = await this.userService.getUsers(query);
        
        // Remove password_hash from all users in response
        const usersWithoutPassword = result.data.map(user => {
            const { password_hash, ...userResponse } = user;
            return userResponse as UserResponseDto;
        });
        
        return new PaginatedResponseDto(
            this.messageService.get('success.retrieved'),
            usersWithoutPassword,
            result.meta
        );
    }

    @Get('search')
    @ApiOperation({ summary: 'Search users by email or username' })
    @ApiResponse({ status: 200, description: 'Users found successfully' })
    async searchUsers(@Query() query: SearchPaginationQueryDto): Promise<PaginatedResponseDto<UserResponseDto>> {
        if (!query.search) {
            return this.getUsers(query);
        }

        const result = await this.userService.searchUsers(query.search, query);
        
        // Remove password_hash from all users in response
        const usersWithoutPassword = result.data.map(user => {
            const { password_hash, ...userResponse } = user;
            return userResponse as UserResponseDto;
        });
        
        return new PaginatedResponseDto(
            this.messageService.get('success.retrieved'),
            usersWithoutPassword,
            result.meta
        );
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get user by ID' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User found successfully', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async getUserById(@Param('id') id: string): Promise<SuccessResponseDto<UserResponseDto | null>> {
        const user = await this.userService.getUserById(id);
        
        if (!user) {
            return new SuccessResponseDto(
                this.messageService.get('user.not_found'),
                null,
                HttpStatus.NOT_FOUND
            );
        }
        
        // Remove password_hash from response
        const { password_hash, ...userResponse } = user;
        
        return new SuccessResponseDto(
            this.messageService.get('success.retrieved'),
            userResponse as UserResponseDto
        );
    }

    @Put(':id')
    @ApiOperation({ summary: 'Update user' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User updated successfully', type: UserResponseDto })
    @ApiResponse({ status: 404, description: 'User not found' })
    async updateUser(
        @Param('id') id: string,
        @Body() updateUserDto: UpdateUserDto
    ): Promise<SuccessResponseDto<UserResponseDto | null>> {
        const user = await this.userService.updateUser(id, updateUserDto);
        
        if (!user) {
            return new SuccessResponseDto(
                this.messageService.get('user.not_found'),
                null,
                HttpStatus.NOT_FOUND
            );
        }
        
        // Remove password_hash from response
        const { password_hash, ...userResponse } = user;
        
        return new SuccessResponseDto(
            this.messageService.get('user.updated'),
            userResponse as UserResponseDto
        );
    }

    @Delete(':id/deactivate')
    @ApiOperation({ summary: 'Deactivate user (soft delete)' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User deactivated successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deactivateUser(@Param('id') id: string): Promise<SuccessResponseDto<boolean>> {
        const result = await this.userService.deactivateUser(id);
        
        return new SuccessResponseDto(
            result ? this.messageService.get('user.deactivated') : this.messageService.get('user.not_found'),
            result,
            result ? HttpStatus.OK : HttpStatus.NOT_FOUND
        );
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete user permanently' })
    @ApiParam({ name: 'id', description: 'User ID' })
    @ApiResponse({ status: 200, description: 'User deleted successfully' })
    @ApiResponse({ status: 404, description: 'User not found' })
    async deleteUser(@Param('id') id: string): Promise<SuccessResponseDto<boolean>> {
        const result = await this.userService.deleteUser(id);
        
        return new SuccessResponseDto(
            result ? this.messageService.get('user.deleted') : this.messageService.get('user.not_found'),
            result,
            result ? HttpStatus.OK : HttpStatus.NOT_FOUND
        );
    }
}
