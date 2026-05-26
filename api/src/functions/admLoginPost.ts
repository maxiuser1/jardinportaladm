import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { createJwt } from '../aplicacion/auth/seguridad';
import { Usuario } from '../model/usuario';
import { IngresoRequest } from '../model/vm/bo/auth/ingreso-request';

export async function admLoginPost(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    try {
        const payload = (await request.json()) as IngresoRequest;

        if (!payload.correo || !payload.clave) {
            return { status: 400, jsonBody: { mensaje: "Correo y clave son requeridos." } };
        }

        const container = db().container(Contenedores.USUARIOS);

        // Buscamos usuarios activos por el correo
        const query = `SELECT * FROM c WHERE c.contacto.correo = @correo`;
        const { resources } = await container.items.query<Usuario>({
            query,
            parameters: [{ name: "@correo", value: payload.correo.toLowerCase().trim() }]
        }).fetchAll();

        if (resources.length === 0) {
            return { status: 401, jsonBody: { mensaje: 'Credenciales inválidas' } };
        }

        const usuario = resources[0];

        if (usuario.autenticacion.clave !== payload.clave) {
            return { status: 401, jsonBody: { mensaje: 'Credenciales inválidas' } };
        }

        if (usuario.estado === 'DESHABILITADO') {
            return { status: 401, jsonBody: { mensaje: 'Usuario no habilitado' } };
        }

        if (usuario.autenticacion.bloqueado) {
            return { status: 401, jsonBody: { mensaje: 'Usuario bloqueado' } };
        }

        // Verificamos que tenga el rol de SAAS_ADMIN
        if (!usuario.autenticacion.roles.includes('SAAS_ADMIN')) {
            return { status: 403, jsonBody: { mensaje: 'Acceso denegado: Se requiere rol de Administrador SaaS' } };
        }

        const token = createJwt({
            sub: usuario.id,
            tenant: usuario.tenant,
            roles: usuario.autenticacion.roles,
            nombre: `${usuario.nombres} ${usuario.apellidos}`,
            correo: usuario.contacto.correo,
        });

        return {
            status: 200,
            jsonBody: {
                token,
                redirectUrl: `/super-admin`
            },
        };


    } catch (error: any) {
        context.error('Error logueando al super-admin:', error);
        return {
            status: 500,
            jsonBody: { mensaje: 'Ocurrió un error general internamente' }
        };
    }
}

app.http('admLoginPost', {
    methods: ['POST'],
    authLevel: 'anonymous',
    route: 'adm/login',
    handler: admLoginPost,
});
