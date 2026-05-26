import * as jwt from 'jsonwebtoken';
const ISSUER = 'app-inversiones';
const AUDIENCE = 'app-inversiones-client';
const SECRET = process.env.JWT_SECRET || 'supersecretkey';
export function createJwt(payload: { sub: string; roles: string[]; [key: string]: any }) {
  return jwt.sign(payload, SECRET, {
    algorithm: 'HS256',
    expiresIn: '15m',
    issuer: ISSUER,
    audience: AUDIENCE,
  });
}

export function verifyJwt(token: string) {
  return jwt.verify(token, SECRET, {
    algorithms: ['HS256'],
    issuer: ISSUER,
    audience: AUDIENCE,
  });
}
