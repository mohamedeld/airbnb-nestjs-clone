import { Reflector } from '@nestjs/core';
import { Role } from 'src/common/constants';

export const Allowed = Reflector.createDecorator<Role[]>();
