export const Roles = {
  ADMINISTRADOR: 'ADMINISTRADOR',
  PERSONA: 'PERSONA',
  REPRESENTANTE: 'REPRESENTANTE',
  INVERSIONISTA: 'INVERSIONISTA',
  EJECUTIVO: 'EJECUTIVO',
  SAAS_ADMIN: 'SAAS_ADMIN',
} as const;
export type Roles = (typeof Roles)[keyof typeof Roles];
