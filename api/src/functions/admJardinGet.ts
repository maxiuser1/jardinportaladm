import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { Jardin } from '../model/jardin';
import { JardinDetalleVm } from '../model/vm/adm/jardin-detalle-vm';

export async function admJardinGet(
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

        const database = db();
        const { resource: jardin } = await database
            .container(Contenedores.JARDINES)
            .item(id, id)
            .read<Jardin>();

        if (!jardin) {
            return { status: 404, jsonBody: { error: 'Jardín no encontrado' } };
        }

        const vm: JardinDetalleVm = {
            id: jardin.id,
            creadoEn: jardin.creadoEn,
            actualizadoEn: jardin.actualizadoEn || null,
            nombreComercial: jardin.nombreComercial,
            razonSocial: jardin.razonSocial,
            ruc: jardin.ruc,
            correoFacturacion: jardin.correoFacturacion,
            responsablePago: jardin.responsablePago,
            planVigente: jardin.planVigente,
            fechaInicioPlan: jardin.fechaInicioPlan,
            fechaFinPlan: jardin.fechaFinPlan,
            estado: jardin.estado,
            moneda: jardin.moneda,
            intermediarios: jardin.intermediarios || [],
            estilos: jardin.estilos ? {
                rutaLogo: jardin.estilos.rutaLogo,
                primary: jardin.estilos.primary,
                secondary: jardin.estilos.secondary,
                accent: jardin.estilos.accent,
            } : null,
            vigenciaCotizacion: jardin.vigenciaCotizacion || 0,
        };

        return { status: 200, jsonBody: { vm } };
    } catch (error: any) {
        context.error(`Error getting jardin detail for ${request.params.id}:`, error);
        return {
            status: 500,
            jsonBody: { message: error.message },
        };
    }
}

app.http('admJardinGet', {
    route: 'adm/jardines/{id}',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: admJardinGet,
});
