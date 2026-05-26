import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';
import { Criterion } from '../model/shared/criterion';

export async function bo{Entity}List(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const tenant = request.headers.get("x-tenant");
  if (!tenant) return { status: 400, jsonBody: { mensaje: "Falta x-tenant header" } };

  try {
    // A List acts as a POST to consume the Criterion body
    // If body is empty, we handle default values safely
    const bodyStr = await request.text();
    const criterion: Partial<Criterion> = bodyStr ? JSON.parse(bodyStr) : {};
    
    // Defaults for pagination
    const limit = criterion.limit || 50;
    const offset = criterion.offset || 0;

    const container = db().container(Contenedores.{CONTAINER_CONST});
    
    // Minimum query with tenant isolation
    let query = 'SELECT * FROM c WHERE c.tenant = @tenant';
    const parameters = [{ name: '@tenant', value: tenant }];

    // Optional: Extract specific filters from criterion.filters to append to 'query' and 'parameters'
    // ...

    // Default sorting and pagination
    query += ' ORDER BY c._ts DESC OFFSET @offset LIMIT @limit';
    parameters.push({ name: '@offset', value: offset });
    parameters.push({ name: '@limit', value: limit });

    const { resources } = await container.items.query({ query, parameters }).fetchAll();

    // Query for total count ignoring limits to provide correct 'total' for frontend
    let countQuery = 'SELECT VALUE COUNT(1) FROM c WHERE c.tenant = @tenant';
    const { resources: countResources } = await container.items.query({ query: countQuery, parameters: [{ name: '@tenant', value: tenant }] }).fetchAll();
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
    context.error(`Error in bo{Entity}List: ${error.message}`);
    return { status: 500, jsonBody: { mensaje: "Error interno del servidor" } };
  }
}

app.http('bo{Entity}List', {
  methods: ['POST'],
  authLevel: 'anonymous',
  handler: bo{Entity}List,
});
