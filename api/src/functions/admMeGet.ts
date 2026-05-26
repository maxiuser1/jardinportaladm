import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { Jardin, Sucursal, Usuario } from '../model';
import { UsuarioVm } from '../model/vm/bo/usuario-vm';

export async function admMeGet(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    try {
        const { session, error } = obtenerSession(request);
        console.log('session', session);
        if (error) {
            return { status: error.status, jsonBody: { error: error.message } };
        }

        const id = session!.sub;
        const database = db();

        const { resource: usuario } = await database
            .container(Contenedores.USUARIOS)
            .item(id, session.tenant)
            .read<Usuario>();

        if (!usuario) {
            return { status: 404, jsonBody: { error: 'Usuario no encontrado' } };
        }

        const vm: UsuarioVm = {
            id: usuario.id,
            nombres: usuario.nombres,
            apellidos: usuario.apellidos,
            correo: usuario.contacto.correo,
            roles: usuario.autenticacion.roles,
            sucursalDefectoId: '',
            tenant: {
                id: '',
                nombre: '',
                logo: '',
                moneda: 'CLP',
                colores: {
                    primary: '',
                    secondary: '',
                    accent: '',
                }
            },
            sucursales: []
        };

        return { jsonBody: vm };
    } catch (error: any) {
        return {
            status: 500,
            jsonBody: { message: error.message },
        };
    }
}

app.http('admMeGet', {
    route: 'adm/me',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: admMeGet,
});
