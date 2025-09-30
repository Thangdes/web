import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose, Transform } from 'class-transformer';
import { BaseEntityDto } from '../../../common/dto/base-entity.dto';

export class UserResponseDto extends BaseEntityDto {
  @ApiProperty({ 
    example: 'john.doe@example.com',
    description: 'User email address'
  })
  @Expose()
  email: string;

  @ApiProperty({ 
    example: 'johndoe123',
    description: 'Username'
  })
  @Expose()
  username: string;

  @ApiProperty({ 
    example: 'John',
    description: 'First name'
  })
  @Expose()
  first_name: string;

  @ApiProperty({ 
    example: 'Doe',
    description: 'Last name'
  })
  @Expose()
  last_name: string;

  @ApiProperty({ 
    example: 'https://example.com/avatar.jpg',
    description: 'Avatar URL',
    required: false
  })
  @Expose()
  avatar?: string;

  @ApiProperty({ 
    example: true,
    description: 'Email verification status'
  })
  @Expose()
  is_verified: boolean;

  @ApiProperty({ 
    example: true,
    description: 'Account active status'
  })
  @Expose()
  is_active: boolean;

  @ApiProperty({ 
    example: 'John Doe',
    description: 'Full name'
  })
  @Expose()
  @Transform(({ obj }) => `${obj.first_name} ${obj.last_name}`.trim())
  full_name: string;

  // Exclude sensitive fields
  @Exclude()
  password_hash: string;
}

export class AuthTokensDto {
  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT access token'
  })
  access_token: string;

  @ApiProperty({ 
    example: 'Bearer',
    description: 'Token type'
  })
  token_type: string = 'Bearer';

  @ApiProperty({ 
    example: 3600,
    description: 'Token expiration time in seconds'
  })
  expires_in: number;

  @ApiProperty({ 
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
    description: 'JWT refresh token',
    required: false
  })
  refresh_token?: string;
}

export class AuthResponseDto {
  @ApiProperty({ 
    description: 'Authentication tokens'
  })
  tokens: AuthTokensDto;

  @ApiProperty({ 
    description: 'User information'
  })
  user: UserResponseDto;

  @ApiProperty({ 
    example: '2024-01-15T10:00:00Z',
    description: 'Login timestamp'
  })
  login_at: Date;

  constructor(tokens: AuthTokensDto, user: UserResponseDto) {
    this.tokens = tokens;
    this.user = user;
    this.login_at = new Date();
  }
}
