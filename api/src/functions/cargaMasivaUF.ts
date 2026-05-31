import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { obtenerSession } from '../aplicacion/helpers/auth';
import { ParamUf } from '../model/shared/paramUf';

interface FindicUfResponse {
    version: string;
    autor: string;
    codigo: string;
    nombre: string;
    unidad_medida: string;
    serie: Array<{
        fecha: string; // YYYY-MM-DD
        valor: number;
    }>;
}

export async function cargaMasivaUF(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    try {
        const { session, error } = obtenerSession(request);
        if (error) {
            return { status: error.status, jsonBody: { error: error.message } };
        }

        // Fetch UF series from findic.cl API
        const response = await fetch('https://findic.cl/api/uf');
        if (!response.ok) {
            throw new Error(`Error fetching UF data: ${response.statusText}`);
        }

        const data = (await response.json()) as FindicUfResponse;
        if (!data || !Array.isArray(data.serie)) {
            return { status: 400, jsonBody: { error: 'Formato de respuesta API UF inválido' } };
        }

        const database = db();
        const container = database.container(Contenedores.CONFIGURACIONES);

        let creados = 0;
        let omitidos = 0;

        for (const item of data.serie) {
            // Format ID: UF + YYYYMMDD
            // item.fecha comes in "YYYY-MM-DD" format
            const yyyymmdd = item.fecha.replace(/-/g, '');
            const id = `UF${yyyymmdd}`;

            // Check if this UF document already exists
            const { resource: existing } = await container.item(id, 'admin').read<ParamUf>();

            if (!existing) {
                const doc: ParamUf = {
                    id,
                    valor: item.valor,
                    tenant: 'admin',
                    tipo: 'UF'
                };
                await container.items.create(doc);
                creados++;
            } else {
                omitidos++;
            }
        }

        return {
            status: 200,
            jsonBody: {
                message: 'Población de UF completada',
                creados,
                omitidos
            }
        };
    } catch (error: any) {
        context.error('Error en cargaMasivaUF:', error);
        return {
            status: 500,
            jsonBody: { message: error.message },
        };
    }
}

app.http('cargaMasivaUF', {
    route: 'adm/uf/cargar',
    methods: ['POST'],
    authLevel: 'anonymous',
    handler: cargaMasivaUF,
});
