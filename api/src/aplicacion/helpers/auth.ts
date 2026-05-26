import { HttpRequest } from '@azure/functions';
import { decode } from 'jsonwebtoken';

export interface AuthSession {
  sub: string;
  nombre: string;
  correo: string;
  role: string;
  tenant: string;
}

export function obtenerSession(request: HttpRequest): {
  session?: AuthSession;
  error?: { status: number; message: string };
} {
  const authHeader = request.headers.get('x-custom-authorization');

  if (!authHeader) {
    return { error: { status: 401, message: 'No autorizado' } };
  }

  const token = authHeader.replace('Bearer ', '');
  const decoded: any = decode(token);

  if (!decoded || !decoded.sub) {
    return { error: { status: 401, message: 'Token inválido' } };
  }

  return {
    session: {
      sub: decoded.sub,
      nombre: decoded.nombre || 'Usuario',
      correo: decoded.correo || '',
      role: decoded.role || '',
      tenant: decoded.tenant || '',
    },
  };
}
