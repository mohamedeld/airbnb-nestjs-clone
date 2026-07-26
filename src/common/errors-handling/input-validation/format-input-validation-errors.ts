import { ArgumentsHost, ValidationError } from '@nestjs/common';
import { IErrorResponse } from '../error-response.interface';
import { I18nService, I18nContext } from 'nestjs-i18n';

function parseArgs(json: string): Record<string, unknown> {
  const parsed: unknown = JSON.parse(json);

  if (typeof parsed === 'object' && parsed !== null) {
    return parsed as Record<string, unknown>;
  }

  return {};
}

export function formatInputValidationErrors(
  errors: ValidationError[],
  i18n: I18nService,
  host: ArgumentsHost,
): IErrorResponse[] {
  const lang = I18nContext.current(host)?.lang ?? 'en';

  return errors.flatMap((error) => {
    const constraints = error.constraints ?? {};

    return Object.values(constraints).map((message) => {
      const [translationKey, argsJson] = message.split('|');

      let translatedMessage = message;

      if (i18n) {
        try {
          const args = argsJson ? parseArgs(argsJson) : {};

          translatedMessage = i18n.translate(translationKey, {
            lang,
            args,
          });
        } catch {
          translatedMessage = message;
        }
      }

      return {
        field: error.property,
        message: translatedMessage,
      };
    });
  });
}
