export interface IngresoForm {
  correo: string;
  clave: string;
}

export const ingresoDefault: IngresoForm = { correo: 'supervisor@inabif.gob.pe', clave: '123456' };

export interface AuthResponse {
  token?: string;
  mensaje?: string;
}

export enum EstadoAcceso {
  VERIFICAR_EMAIL = 'VERIFICAR_EMAIL'
}

export interface IngresoRequest {
  correo: string;
  clave: string;
}
