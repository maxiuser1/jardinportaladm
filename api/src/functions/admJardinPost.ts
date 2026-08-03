import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { Jardin } from '../model/jardin';
import { JardinPostVm } from '../model/vm/adm/jardin-post-vm';
import { Usuario } from '../model/usuario';
import { Secuencia } from '../model/secuencia';
import { randomUUID } from 'crypto';

export async function admJardinPost(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    try {
        const { session, error } = obtenerSession(request);
        if (error) {
            return { status: error.status, jsonBody: { error: error.message } };
        }

        const vm = (await request.json()) as JardinPostVm;
        if (
            !vm.id || !vm.nombreComercial || !vm.razonSocial || !vm.ruc || !vm.correoFacturacion || !vm.responsablePago || !vm.moneda || vm.vigenciaCotizacion === undefined ||
            !vm.periodo || !vm.periodo.desde || !vm.periodo.hasta ||
            !vm.usuarioNombres || !vm.usuarioApellidos || !vm.usuarioCorreo || !vm.usuarioClave
        ) {
            return { status: 400, jsonBody: { error: 'Faltan campos obligatorios' } };
        }

        const database = db();
        const container = database.container(Contenedores.JARDINES);

        const { resource: existingJardin } = await container.item(vm.id, vm.id).read<Jardin>();
        if (existingJardin) {
            return { status: 409, jsonBody: { error: 'Ya existe un jardín con ese ID/Slug' } };
        }

        // Check if user already exists
        const userContainer = database.container(Contenedores.USUARIOS);
        const query = `SELECT * FROM c WHERE c.contacto.correo = @correo`;
        const { resources: existingUsers } = await userContainer.items.query<Usuario>({
            query,
            parameters: [{ name: "@correo", value: vm.usuarioCorreo.toLowerCase().trim() }]
        }).fetchAll();

        if (existingUsers.length > 0) {
            return { status: 409, jsonBody: { error: 'Ya existe un usuario con ese correo electrónico' } };
        }

        const nuevoJardin: Jardin = {
            id: vm.id,
            creado: new Date().toISOString(),
            actualizado: null,
            tipo: 'jardin',
            nombreComercial: vm.nombreComercial,
            razonSocial: vm.razonSocial,
            ruc: vm.ruc,
            correoFacturacion: vm.correoFacturacion,
            responsablePago: vm.responsablePago,
            planVigente: 'DEMO',
            fechaInicioPlan: new Date().toISOString(),
            fechaFinPlan: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
            estado: 'DEMO',
            moneda: vm.moneda,
            intermediarios: [],
            vigenciaCotizacion: vm.vigenciaCotizacion,
            periodo: vm.periodo,
        };

        const nuevoUsuario: Usuario = {
            id: `usr-${randomUUID()}`,
            tenant: vm.id,
            tipo: 'usuario',
            nombres: vm.usuarioNombres,
            apellidos: vm.usuarioApellidos,
            sucursales: [],
            contacto: {
                correo: vm.usuarioCorreo.toLowerCase().trim(),
            },
            autenticacion: {
                clave: vm.usuarioClave,
                bloqueado: false,
                estado: 'VERIFICADO',
                roles: ['supervisor', 'ejecutivo'],
            },
            estado: 'ACTIVO',
            creadoEn: new Date().toISOString(),
        };

        const secuenciasContainer = database.container(Contenedores.SECUENCIAS);
        const secuenciaMatriculas: Secuencia = {
            id: 'matriculas',
            tenant: nuevoJardin.id,
            va: 0,
        };
        const secuenciaCotizaciones: Secuencia = {
            id: 'cotizaciones',
            tenant: nuevoJardin.id,
            va: 0,
        };

        await container.items.create(nuevoJardin);
        await userContainer.items.create(nuevoUsuario);
        await secuenciasContainer.items.create(secuenciaMatriculas);
        await secuenciasContainer.items.create(secuenciaCotizaciones);

        return { status: 201, jsonBody: { success: true, id: nuevoJardin.id } };
    } catch (error: any) {
        context.error('Error creating jardin and user:', error);
        return {
            status: 500,
            jsonBody: { error: error.message },
        };
    }
}

app.http('admJardinPost', {
    route: 'adm/jardines',
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: admJardinPost,
});
