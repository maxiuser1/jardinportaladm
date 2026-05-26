import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';

export async function boSucursalGet(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const tenant = request.headers.get("x-tenant");
  const id = request.query.get("id");

  if (!tenant) return { status: 400, jsonBody: { mensaje: "Falta x-tenant header" } };
  if (!id) return { status: 400, jsonBody: { mensaje: "Falta el parametro id en la query string" } };

  try {
    const container = db().container(Contenedores.SUCURSALES);
    
    // High performance point read using ID and Partition Key (tenant)
    const { resource } = await container.item(id, tenant).read();

    if (!resource) return { status: 404, jsonBody: { mensaje: "Sucursal no encontrada" } };

    return {
      status: 200,
      jsonBody: { data: resource },
    };
  } catch (error: any) {
    context.error(`Error in boSucursalGet: ${error.message}`);
    return { status: 500, jsonBody: { mensaje: "Error interno del servidor al obtener la sucursal" } };
  }
}

app.http('boSucursalGet', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: boSucursalGet,
});
