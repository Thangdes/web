import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
  Matches,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class RegisterDto {
  @ApiProperty({ 
    example: 'john.doe@example.com',
    description: 'User email address'
  })
  @IsEmail({}, { message: 'Please provide a valid email address' })
  @IsNotEmpty({ message: 'Email is required' })
  @Transform(({ value }) => value?.toLowerCase().trim())
  email: string;

  @ApiProperty({ 
    example: 'johndoe123',
    description: 'Unique username (3-30 characters, alphanumeric and underscore only)'
  })
  @IsString({ message: 'Username must be a string' })
  @IsNotEmpty({ message: 'Username is required' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @Matches(/^[a-zA-Z0-9_]+$/, { 
    message: 'Username can only contain letters, numbers, and underscores' 
  })
  @Transform(({ value }) => value?.toLowerCase().trim())
  username: string;

  @ApiProperty({ 
    example: 'SecurePass123!',
    description: 'Strong password (min 8 chars, uppercase, lowercase, number, special char)'
  })
  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  }, { 
    message: 'Password must contain at least 8 characters with uppercase, lowercase, number and special character' 
  })
  password: string;

  @ApiProperty({ 
    example: 'John',
    description: 'User first name'
  })
  @IsString({ message: 'First name must be a string' })
  @IsNotEmpty({ message: 'First name is required' })
  @Transform(({ value }) => value?.trim())
  first_name: string;

  @ApiProperty({ 
    example: 'Doe',
    description: 'User last name'
  })
  @IsString({ message: 'Last name must be a string' })
  @IsNotEmpty({ message: 'Last name is required' })
  @Transform(({ value }) => value?.trim())
  last_name: string;

  @ApiProperty({ 
    example: 'https://example.com/avatar.jpg',
    description: 'User avatar URL (optional)',
    required: false
  })
  @IsOptional()
  @IsString({ message: 'Avatar must be a string' })
  @Transform(({ value }) => value?.trim())
  avatar?: string;
}
