import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { Criterion } from '../model/shared/criterion';

export async function boNinosList(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const tenant = request.headers.get("x-tenant");
  if (!tenant) return { status: 400, jsonBody: { mensaje: "Falta x-tenant header requerida" } };

  try {
    const bodyStr = await request.text();
    const criterion: Partial<Criterion> = bodyStr ? JSON.parse(bodyStr) : {};
    
    const limit = criterion.limit || 50;
    const offset = criterion.offset || 0;

    const container = db().container(Contenedores.NINOS);
    
    // Core tenant isolation query
    let query = 'SELECT * FROM c WHERE c.tenant = @tenant';
    const parameters = [{ name: '@tenant', value: tenant }];

    // Example mapping criterion filters to CosmosDB SQL
    if (criterion.filters && criterion.filters.length > 0) {
      criterion.filters.forEach((filtro, index) => {
        if (filtro.field === 'rut' && filtro.operator === 'EQUALS') {
          query += ` AND c.rut = @rut${index}`;
          parameters.push({ name: `@rut${index}`, value: filtro.value });
        }
      });
    }

    query += ' ORDER BY c._ts DESC OFFSET @offset LIMIT @limit';
    parameters.push({ name: '@offset', value: offset });
    parameters.push({ name: '@limit', value: limit });

    const { resources } = await container.items.query({ query, parameters }).fetchAll();

    // Query for absolute total
    let countQuery = 'SELECT VALUE COUNT(1) FROM c WHERE c.tenant = @tenant';
    const { resources: countResources } = await container.items.query({ 
        query: countQuery, 
        parameters: [{ name: '@tenant', value: tenant }] 
    }).fetchAll();
    
    const total = countResources[0] || resources.length;

    return {
      status: 200,
      jsonBody: {
        items: resources,
        total: total,
        limit: limit,
        offset: offset
      },
    };
  } catch (error: any) {
    context.error(`Error in boNinosList: ${error.message}`);
    return { status: 500, jsonBody: { mensaje: "Error interno del servidor al listar ninos" } };
  }
}

app.http('boNinosList', {
  methods: ['POST'],
  authLevel: 'anonymous', 
  handler: boNinosList,
});
