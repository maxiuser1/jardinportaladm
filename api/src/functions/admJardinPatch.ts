import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { Jardin } from '../model/jardin';
import { JardinPatchVm } from '../model/vm/adm/jardin-patch-vm';

export async function admJardinPatch(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    try {
        const { session, error } = obtenerSession(request);
        if (error) {
            return { status: error.status, jsonBody: { error: error.message } };
        }

        const id = request.params.id;
        if (!id) {
            return { status: 400, jsonBody: { error: 'El ID del jardín es requerido' } };
        }

        const vm = (await request.json()) as JardinPatchVm;

        const database = db();
        const container = database.container(Contenedores.JARDINES);

        const { resource: existingJardin } = await container.item(id, id).read<Jardin>();
        if (!existingJardin) {
            return { status: 404, jsonBody: { error: 'Jardín no encontrado' } };
        }

        if (vm.nombreComercial !== undefined) existingJardin.nombreComercial = vm.nombreComercial;
        if (vm.razonSocial !== undefined) existingJardin.razonSocial = vm.razonSocial;
        if (vm.ruc !== undefined) existingJardin.ruc = vm.ruc;
        if (vm.correoFacturacion !== undefined) existingJardin.correoFacturacion = vm.correoFacturacion;
        if (vm.responsablePago !== undefined) existingJardin.responsablePago = vm.responsablePago;
        if (vm.moneda !== undefined) existingJardin.moneda = vm.moneda;
        if (vm.vigenciaCotizacion !== undefined) existingJardin.vigenciaCotizacion = vm.vigenciaCotizacion;
        if (vm.periodo !== undefined) existingJardin.periodo = vm.periodo;
        if (vm.codigoAutorizacionDescuento !== undefined) {
            existingJardin.codigoAutorizacionDescuento = vm.codigoAutorizacionDescuento ? vm.codigoAutorizacionDescuento.trim() : null;
        }
        existingJardin.actualizado = new Date().toISOString();

        await container.item(id, id).replace(existingJardin);

        return { status: 200, jsonBody: { success: true } };
    } catch (error: any) {
        context.error(`Error patching jardin ${request.params.id}:`, error);
        return {
            status: 500,
            jsonBody: { error: error.message },
        };
    }
}

app.http('admJardinPatch', {
    route: 'adm/jardines/{id}',
    methods: ['PATCH'],
    authLevel: 'anonymous',
    handler: admJardinPatch,
});
