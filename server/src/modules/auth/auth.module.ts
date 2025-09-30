import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { CookieAuthService } from './services/cookie-auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtCookieStrategy } from './strategies/jwt-cookie.strategy';
import { UsersModule } from '../users/users.module';
import { ConfigModule } from '../../config/config.module';
import env from '../../config/env';
import { CommonModule } from '../../common/common.module';

@Module({
  imports: [
    CommonModule,
    ConfigModule,
    PassportModule,
    JwtModule.register({
      secret: env.JWT_SECRET,
      signOptions: {
        expiresIn: env.JWT_EXPIRES_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService, 
    AuthRepository, 
    CookieAuthService,
    JwtStrategy,
    JwtCookieStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}