import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { obtenerSession } from '../aplicacion/helpers/auth';

export async function geoLocalizado(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    const { session, error } = obtenerSession(request);
    if (error) return { status: error.status, jsonBody: { mensaje: error.message } };

    try {
        const id = request.query.get('id');
        if (!id) {
            return { status: 400, jsonBody: { mensaje: "Falta parámetro: id" } };
        }

        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            context.error("Google Places API Key no está configurada en local.settings.json");
            return { status: 500, jsonBody: { mensaje: "API Key de geolocalización no configurada" } };
        }

        const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(id)}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey,
                'X-Goog-FieldMask': 'addressComponents'
            }
        });

        if (!response.ok) {
            const errText = await response.text();
            context.error(`Error de Google Places Details API: ${response.status} - ${errText}`);
            return { status: 502, jsonBody: { mensaje: "Error al consultar detalles de geolocalización" } };
        }

        const data = await response.json();
        return { status: 200, jsonBody: data };

    } catch (err: any) {
        context.error(`Error en geoLocalizado: ${err.message}`);
        return { status: 500, jsonBody: { mensaje: "Error interno al geolocalizar" } };
    }
}

app.http('geoLocalizado', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'bo/geoLocalizado',
    handler: geoLocalizado,
});
