# Phase 1.1: Hướng dẫn Implement Authentication System

## 📋 Tổng quan

Đây là hướng dẫn chi tiết để implement hệ thống xác thực (Authentication System) cho Tempra Project - Phase 1.1.

**Mục tiêu**: Xây dựng hệ thống xác thực hoàn chỉnh với JWT tokens, login/register endpoints.

**Dependencies cần thiết**:

- NestJS JWT module
- bcrypt (để hash password)
- class-validator, class-transformer
- passport-jwt

---

## 🚀 Bước 1: Cài đặt Dependencies

Chạy lệnh sau trong thư mục `server/`:

```bash
npm install @nestjs/jwt @nestjs/passport passport passport-jwt bcrypt
npm install -D @types/passport-jwt @types/bcrypt
```

---

## 🔧 Bước 2: Tạo Auth Module Structure

### 2.1 Tạo thư mục và files

Tạo cấu trúc thư mục như sau trong `src/modules/`:

```
src/modules/auth/
├── auth.controller.ts
├── auth.module.ts
├── auth.service.ts
├── dto/
│   ├── login.dto.ts
│   └── register.dto.ts
├── guards/
│   └── jwt-auth.guard.ts
├── strategies/
│   └── jwt.strategy.ts
└── interfaces/
    └── auth.interface.ts
```

### 2.2 Tạo DTOs (Data Transfer Objects)

**File: `src/modules/auth/dto/register.dto.ts`**

```typescript
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: '+84901234567', required: false })
  @IsOptional()
  @IsString()
  phone?: string;
}
```

**File: `src/modules/auth/dto/login.dto.ts`**

```typescript
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'john.doe@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
```

---

## 🔐 Bước 3: Tạo Auth Interfaces

**File: `src/modules/auth/interfaces/auth.interface.ts`**

```typescript
export interface JwtPayload {
  sub: number; // user id
  email: string;
  name: string;
  iat?: number;
  exp?: number;
}

export interface AuthResponse {
  access_token: string;
  user: {
    id: number;
    email: string;
    name: string;
    phone?: string;
  };
}
```

---

## 🛡️ Bước 4: Tạo JWT Strategy

**File: `src/modules/auth/strategies/jwt.strategy.ts`**

```typescript
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtPayload } from '../interfaces/auth.interface';
import { UsersService } from '../../users/users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET || 'tempra-secret-key',
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
```

---

## 🛡️ Bước 5: Tạo JWT Auth Guard

**File: `src/modules/auth/guards/jwt-auth.guard.ts`**

```typescript
import {
  Injectable,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    // Check if route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any) {
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid token');
    }
    return user;
  }
}
```

---

## 🔧 Bước 6: Implement Auth Service

**File: `src/modules/auth/auth.service.ts`**

```typescript
import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse, JwtPayload } from './interfaces/auth.interface';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<AuthResponse> {
    // Check if user already exists
    const existingUser = await this.usersService.findByEmail(registerDto.email);
    if (existingUser) {
      throw new ConflictException('Email already registered');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);

    // Create user
    const user = await this.usersService.create({
      ...registerDto,
      password: hashedPassword,
    });

    // Generate JWT token
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    };
  }

  async login(loginDto: LoginDto): Promise<AuthResponse> {
    // Find user by email
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Generate JWT token
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    const access_token = this.jwtService.sign(payload);

    return {
      access_token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        phone: user.phone,
      },
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
```

---

## 🎯 Bước 7: Tạo Auth Controller

**File: `src/modules/auth/auth.controller.ts`**

```typescript
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { AuthResponse } from './interfaces/auth.interface';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({ status: 201, description: 'User successfully registered' })
  @ApiResponse({ status: 409, description: 'Email already registered' })
  async register(@Body() registerDto: RegisterDto): Promise<AuthResponse> {
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, description: 'User successfully logged in' })
  @ApiResponse({ status: 401, description: 'Invalid credentials' })
  async login(@Body() loginDto: LoginDto): Promise<AuthResponse> {
    return this.authService.login(loginDto);
  }
}
```

---

## 📦 Bước 8: Tạo Auth Module

**File: `src/modules/auth/auth.module.ts`**

```typescript
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'tempra-secret-key',
      signOptions: {
        expiresIn: process.env.JWT_EXPIRES_IN || '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  exports: [AuthService, JwtAuthGuard],
})
export class AuthModule {}
```

---

## 🔧 Bước 9: Tạo Public Decorator

**File: `src/common/decorators/public.decorator.ts`**

```typescript
import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

---

## ⚙️ Bước 10: Cập nhật App Module

**File: `src/app.module.ts`** - Thêm AuthModule:

```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard';
// ... other imports

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthModule,
    UsersModule,
    // ... other modules
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    // ... other providers
  ],
})
export class AppModule {}
```

---

## 🔐 Bước 11: Cập nhật Environment Variables

**File: `.env`** - Thêm các biến môi trường:

```env
# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-here
JWT_EXPIRES_IN=24h

# Database (nếu chưa có)
DATABASE_URL="postgresql://username:password@localhost:5432/tempra_db"
```

---

## 🧪 Bước 12: Testing

### API Endpoints để test:

1. **Register User**:

   ```
   POST /auth/register
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123",
     "name": "Test User",
     "phone": "+84901234567"
   }
   ```

2. **Login User**:

   ```
   POST /auth/login
   Content-Type: application/json

   {
     "email": "test@example.com",
     "password": "password123"
   }
   ```

3. **Protected Route** (cần JWT token):
   ```
   GET /protected-route
   Authorization: Bearer your-jwt-token-here
   ```

---

## ✅ Checklist hoàn thành Phase 1.1

- [ ] Cài đặt dependencies (JWT, bcrypt, passport)
- [ ] Tạo cấu trúc thư mục auth module
- [ ] Implement DTOs (Register, Login)
- [ ] Tạo Auth interfaces
- [ ] Implement JWT Strategy
- [ ] Tạo JWT Auth Guard
- [ ] Implement Auth Service với register/login
- [ ] Tạo Auth Controller với endpoints
- [ ] Cấu hình Auth Module
- [ ] Tạo Public decorator
- [ ] Cập nhật App Module
- [ ] Cấu hình environment variables
- [ ] Test API endpoints

---

## 🚀 Bước tiếp theo

Sau khi hoàn thành Phase 1.1, bạn có thể chuyển sang:

- **Phase 1.2**: Create Auth Module (guards, decorators, middleware)
- **Phase 1.3**: Password Hashing (utilities, validation)

---

## 💡 Lưu ý quan trọng

1. **Security**: Luôn sử dụng environment variables cho JWT_SECRET
2. **Password**: Minimum 6 characters, có thể tăng độ phức tạp
3. **Token Expiry**: Mặc định 24h, có thể điều chỉnh theo nhu cầu
4. **Error Handling**: Đã implement basic error handling, có thể mở rộng
5. **Validation**: Sử dụng class-validator cho input validation

Chúc bạn implement thành công! 🎉
