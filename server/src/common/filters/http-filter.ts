import { 
    ArgumentsHost, 
    Catch, 
    ExceptionFilter, 
    HttpException, 
    HttpStatus, 
    Logger,
} from "@nestjs/common";
import { Request, Response } from 'express';
import { MessageService } from "../message/message.service";

interface ErrorResponse {
    statusCode: number;
    message: string | string[];
    error?: string;
    timestamp: string;
    path: string;
    requestId?: string;
    details?: any;
}

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);

    constructor(private readonly messageService: MessageService) {}

    catch(exception: unknown, host: ArgumentsHost): void {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        
        const errorResponse = this.buildErrorResponse(exception, request);
        
        this.logError(exception, request, errorResponse);
        
        response.status(errorResponse.statusCode).json(errorResponse);
    }

    private buildErrorResponse(exception: unknown, request: Request): ErrorResponse {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message: string | string[] = this.messageService.get('error.internal_server_error');
        let error = 'Internal Server Error';
        let details: any = undefined;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            error = exception.constructor.name.replace('Exception', '');
            
            const exceptionResponse = exception.getResponse();
            
            if (typeof exceptionResponse === 'string') {
                message = exceptionResponse;
            } else if (typeof exceptionResponse === 'object') {
                const responseObj = exceptionResponse as any;
                message = responseObj.message || responseObj.error || message;
                details = responseObj.details;
                
                if (responseObj.message && Array.isArray(responseObj.message)) {
                    message = responseObj.message;
                }
            }
        } else if (exception instanceof Error) {
            message = process.env.NODE_ENV === 'production' 
                ? this.messageService.get('error.internal_server_error')
                : exception.message;
            details = process.env.NODE_ENV !== 'production' ? exception.stack : undefined;
        }

        const errorResponse: ErrorResponse = {
            statusCode: status,
            message,
            error,
            timestamp: new Date().toISOString(),
            path: request.url,
            requestId: request.headers['x-request-id'] as string,
        };

        if (details) {
            errorResponse.details = details;
        }

        return errorResponse;
    }

    private logError(exception: unknown, request: Request, errorResponse: ErrorResponse): void {
        const { method, url, ip, headers } = request;
        const userAgent = headers['user-agent'] || '';
        const requestId = headers['x-request-id'] || 'unknown';

        const logMessage = `${method} ${url} - ${errorResponse.statusCode} - ${ip} - ${userAgent} - RequestId: ${requestId}`;

        if (errorResponse.statusCode >= 500) {
            this.logger.error(logMessage, exception instanceof Error ? exception.stack : exception);
        } else if (errorResponse.statusCode >= 400) {
            this.logger.warn(logMessage);
        }
    }
}