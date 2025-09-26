import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import env from './config/env';
import cookieParser from 'cookie-parser';
import { ConsoleLogger, LogLevel } from '@nestjs/common';

async function bootstrap() {
  const getLogLevels = (level: string): LogLevel[] => {
    const levels: Record<string, LogLevel[]> = {
      'error': ['error'],
      'warn': ['error', 'warn'],
      'info': ['error', 'warn', 'log'],
      'debug': ['error', 'warn', 'log', 'debug', 'verbose']
    };
    return levels[level] || levels['info'];
  };
  const LoggerConfig = new ConsoleLogger({
    timestamp: true,
    prefix: 'API',
    logLevels: getLogLevels(env.LOG_LEVEL),
  })
  const app = await NestFactory.create(AppModule, {
    logger: LoggerConfig,
  });
  
  app.use(cookieParser(env.SESSION_SECRET));
  app.setGlobalPrefix(env.API_PREFIX);
  app.enableCors({
    origin: env.CORS_ORIGIN,
    credentials: env.CORS_CREDENTIALS,
    methods: env.CORS_METHODS.split(','),
    exposedHeaders: env.CORS_EXPOSED_HEADERS.split(','),
    maxAge: env.CORS_MAX_AGE, 
  }); 
 
  await app.listen(env.PORT);
  LoggerConfig.log(`🚀 Server running on http://${env.API_HOST}:${env.PORT}/${env.API_PREFIX}`);
}
bootstrap();
