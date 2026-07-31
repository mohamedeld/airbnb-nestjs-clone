import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Allowed } from '../decorators/roles.decorator';
import { RequestWithUser } from './auth.guard.guard';
import { Role } from 'src/common/constants';
import { ForbiddenException } from 'src/common/errors-handling/custom-exceptions/forbidden-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly customI18n: CustomI18nService,
  ) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.getAllAndOverride(Allowed, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!roles || roles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const user = request.user;

    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    if (!roles.includes(user.role as Role)) {
      throw new ForbiddenException(
        this.customI18n.translate('validation.FORBIDDEN'),
      );
    }

    return true;
  }
}
