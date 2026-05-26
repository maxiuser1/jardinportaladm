import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { db } from '../aplicacion/helpers/db';
import { Contenedores } from '../aplicacion/helpers/contenedores';

export async function bo{Entity}Get(
  request: HttpRequest,
  context: InvocationContext,
): Promise<HttpResponseInit> {
  const tenant = request.headers.get("x-tenant");
  const id = request.query.get("id");

  if (!tenant) return { status: 400, jsonBody: { mensaje: "Falta x-tenant header" } };
  if (!id) return { status: 400, jsonBody: { mensaje: "Falta el parametro id" } };

  try {
    const container = db().container(Contenedores.{CONTAINER_CONST});
    
    // High performance point read using ID and Partition Key (tenant)
    // Adjust according to specific entity requirements if needed
    const { resource } = await container.item(id, tenant).read();

    if (!resource) return { status: 404, jsonBody: { mensaje: "Recurso no encontrado" } };

    return {
      status: 200,
      jsonBody: { data: resource },
    };
  } catch (error: any) {
    context.error(`Error in bo{Entity}Get: ${error.message}`);
    return { status: 500, jsonBody: { mensaje: "Error interno del servidor" } };
  }
}

app.http('bo{Entity}Get', {
  methods: ['GET'],
  authLevel: 'anonymous',
  handler: bo{Entity}Get,
});
