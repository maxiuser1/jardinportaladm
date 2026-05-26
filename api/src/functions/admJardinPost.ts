import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { Jardin } from '../model/jardin';
import { JardinPostVm } from '../model/vm/adm/jardin-post-vm';

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
        if (!vm.id || !vm.nombreComercial || !vm.razonSocial || !vm.ruc || !vm.correoFacturacion || !vm.responsablePago || !vm.moneda || vm.vigenciaCotizacion === undefined) {
            return { status: 400, jsonBody: { error: 'Faltan campos obligatorios' } };
        }

        const database = db();
        const container = database.container(Contenedores.JARDINES);

        const { resource: existingJardin } = await container.item(vm.id, vm.id).read<Jardin>();
        if (existingJardin) {
            return { status: 409, jsonBody: { error: 'Ya existe un jardín con ese ID/Slug' } };
        }

        const nuevoJardin: Jardin = {
            id: vm.id,
            creadoEn: new Date().toISOString(),
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
        };

        await container.items.create(nuevoJardin);

        return { status: 201, jsonBody: { success: true, id: nuevoJardin.id } };
    } catch (error: any) {
        context.error('Error creating jardin:', error);
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
