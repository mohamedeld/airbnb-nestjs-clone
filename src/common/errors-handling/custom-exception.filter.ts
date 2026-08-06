import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { BaseCustomException } from './custom-exceptions/base-custom-exception';
import { I18nService, I18nValidationException } from 'nestjs-i18n';
import { formatInputValidationErrors } from './input-validation/format-input-validation-errors';

@Catch()
export class CustomExceptionFilter implements ExceptionFilter {
  constructor(private readonly i18nService: I18nService) {}
  catch(exception: any, host: ArgumentsHost) {
    const response: Response = host.switchToHttp().getResponse();
    if (exception instanceof BaseCustomException) {
      return response.status(exception.status).send({
        errors: exception.formatError(),
      });
    }
    if (exception instanceof I18nValidationException) {
      const inputFormattedErrors = formatInputValidationErrors(
        exception.errors,
        this.i18nService,
        host,
      );
      return response.status(400).send({
        errors: inputFormattedErrors,
      });
    }
    console.log(exception);
    return response.status(500).json({
      errors: [{ message: `Internal Server Error` }],
    });
  }
}
