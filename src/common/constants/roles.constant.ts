export const Roles = {
  SYSTEM_ADMIN: 'admin',
  USER: 'user',
} as const;

export type Role = (typeof Roles)[keyof typeof Roles];
