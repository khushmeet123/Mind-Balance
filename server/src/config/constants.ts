export const APP_NAME = 'MindBalance';
export const API_VERSION = 'v1';
export const K_ANONYMITY_THRESHOLD = 7;

export const ROLES = {
  EMPLOYEE: 'EMPLOYEE',
  HR_MANAGER: 'HR_MANAGER',
  ADMIN: 'ADMIN'
} as const;

export type UserRole = (typeof ROLES)[keyof typeof ROLES];
