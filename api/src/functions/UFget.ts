import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { ParamUf } from '../model/shared/paramUf';

export async function UFget(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    try {
        const { session, error } = obtenerSession(request);
        if (error) {
            return { status: error.status, jsonBody: { error: error.message } };
        }

        const database = db();
        const container = database.container(Contenedores.CONFIGURACIONES);

        // Retrieve all configurations with tipo = 'UF'
        const querySpec = {
            query: "SELECT * FROM c WHERE c.tipo = 'UF' AND c.tenant = 'admin'"
        };

        const { resources: ufs } = await container.items.query<ParamUf>(querySpec).fetchAll();

        return { status: 200, jsonBody: ufs };
    } catch (error: any) {
        context.error('Error fetching UFs:', error);
        return {
            status: 500,
            jsonBody: { message: error.message },
        };
    }
}

app.http('UFget', {
    route: 'adm/uf',
    methods: ['GET'],
    authLevel: 'anonymous',
    handler: UFget,
});
