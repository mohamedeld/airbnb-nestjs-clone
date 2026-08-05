import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { UnauthorizedException } from 'src/common/errors-handling/custom-exceptions/unauthorized.exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from 'src/users/users.service';
import { SystemAdminsService } from 'src/system-admins/system-admins.service';
import { Roles } from 'src/common/constants';
import { ResopnseUserDto } from 'src/users/dtos/user-response.dto';
import { SystemAdminLResponseDto } from 'src/system-admins/dtos/system-admin-reponse.dto';
import { IPrincipal } from '../interfaces/princapal.interace';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from 'src/common/public.decorator';

export type RequestWithUser = Request & {
  user?: IPrincipal;
};

@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);
  constructor(
    private readonly jwtService: JwtService,
    private readonly customI18n: CustomI18nService,
    private readonly userService: UsersService,
    private readonly adminService: SystemAdminsService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest<RequestWithUser>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException(
        this.customI18n.translate('validation.INVALID_TOKEN'),
      );
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);
      const currentAccount = await this.buildCurrentUser(payload);
      request.user = currentAccount;
    } catch (error) {
      this.logger.error(error);
      throw new UnauthorizedException(
        this.customI18n.translate('validation.INVALID_TOKEN'),
      );
    }
    return true;
  }

  private extractTokenFromHeader(request: RequestWithUser): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
  private async buildCurrentUser(payload: JwtPayload): Promise<IPrincipal> {
    let currentAccount: ResopnseUserDto | SystemAdminLResponseDto;
    if (payload.role === Roles.USER) {
      currentAccount = await this.userService.findOne({ _id: payload.sub });
    } else {
      currentAccount = await this.adminService.findOne({ _id: payload.sub });
    }

    return {
      user: {
        _id: currentAccount?.id,
        name: currentAccount?.name,
        email: currentAccount?.email,
      },
      role: payload.role,
    };
  }
}
