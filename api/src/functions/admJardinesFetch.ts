import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { Jardin } from '../model/jardin';
import { JardinItemVm } from '../model/vm/adm/jardin-item-vm';

export async function admJardinesFetch(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    try {
        const { session, error } = obtenerSession(request);
        if (error) {
            return { status: error.status, jsonBody: { error: error.message } };
        }

        const database = db();
        const container = database.container(Contenedores.JARDINES);

        const { resources: jardines } = await container.items.readAll<Jardin>().fetchAll();

        const vms: JardinItemVm[] = jardines.map(jardin => ({
            id: jardin.id,
            nombreComercial: jardin.nombreComercial,
            razonSocial: jardin.razonSocial,
            ruc: jardin.ruc,
            planVigente: jardin.planVigente,
            estado: jardin.estado,
            creadoEn: jardin.creadoEn,
        }));

        return { status: 200, jsonBody: vms };
    } catch (error: any) {
        context.error('Error fetching jardines:', error);
        return {
            status: 500,
            jsonBody: { message: error.message },
        };
    }
}

app.http('admJardinesFetch', {
    route: 'adm/jardines',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: admJardinesFetch,
});
