import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { Response } from 'express';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const { code, meta } = exception;

      const message = this.getMessageByCode(code, meta);
      const status = this.getStatusByCode(code);

      return response.status(status).json({
        statusCode: status,
        message,
        error: HttpStatus[status],
      });
    }
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();

      return response
        .status(status)
        .json(
          typeof res === 'string'
            ? { statusCode: status, message: res, error: HttpStatus[status] }
            : { statusCode: status, ...res },
        );
    }

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
      error: 'Internal Server Error',
    });
  }

  private getStatusByCode(code: string): HttpStatus {
    switch (code) {
      case 'P2025':
        return HttpStatus.NOT_FOUND;
      case 'P2002':
        return HttpStatus.CONFLICT;
      case 'P2003':
      case 'P2000':
      case 'P2001':
        return HttpStatus.BAD_REQUEST;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }

  private getMessageByCode(code: string, meta: any): string {
    switch (code) {
      case 'P2001':
        return `The record was not found`;
      case 'P2002':
        return `Unique constraint failed on the field(s): ${meta?.constraint ?? ''}`;
      case 'P2003':
        return `Foreign key constraint failed on the field: ${meta?.constraint ?? ''}`;
      case 'P2025':
        return `Requested record not found.`;
      default:
        return 'Internal server error';
    }
  }
}
