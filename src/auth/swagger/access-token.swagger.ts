import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AccessTokenResponse } from '../dtos/acceess-token-response.dto';

export function AccessTokenSwagger() {
  return applyDecorators(
    ApiResponse({ status: 200, type: AccessTokenResponse }),
    ApiResponse({
      status: 400,
      description: 'Validation error',
      schema: {
        type: 'object',
        properties: {
          errors: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Invalid credentials.',
                },
              },
            },
          },
        },
      },
    }),
  );
}
