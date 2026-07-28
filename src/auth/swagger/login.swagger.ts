import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { AuthResponseDto } from 'src/users/dtos/auth-response.dto';

export function LoginSwagger() {
  return applyDecorators(
    ApiResponse({ status: 200, type: AuthResponseDto }),
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
