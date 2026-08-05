import { Roles } from 'src/common/constants';

export interface JwtPayload {
  id: string;
  role: (typeof Roles)[keyof typeof Roles];
  sub: string;
}
