import { app, HttpRequest, HttpResponseInit, InvocationContext } from '@azure/functions';
import { obtenerSession } from '../aplicacion/helpers/auth';

export async function geoLocalizar(
    request: HttpRequest,
    context: InvocationContext,
): Promise<HttpResponseInit> {
    const { session, error } = obtenerSession(request);
    if (error) return { status: error.status, jsonBody: { mensaje: error.message } };

    try {
        const input = request.query.get('input');
        if (!input || input.length <= 3) {
            return { status: 200, jsonBody: { suggestions: [] } };
        }

        const apiKey = process.env.GOOGLE_PLACES_API_KEY;
        if (!apiKey) {
            context.error("Google Places API Key no está configurada en local.settings.json");
            return { status: 500, jsonBody: { mensaje: "API Key de geolocalización no configurada" } };
        }

        const url = 'https://places.googleapis.com/v1/places:autocomplete';
        const body = {
            input,
            includedRegionCodes: ["cl"],
            languageCode: "es",
            regionCode: "cl",
            includeQueryPredictions: false,
            includedPrimaryTypes: ["street_address", "route"]
        };

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Goog-Api-Key': apiKey
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errText = await response.text();
            context.error(`Error de Google Places API: ${response.status} - ${errText}`);
            return { status: 502, jsonBody: { mensaje: "Error al consultar proveedor de geolocalización" } };
        }

        const data = await response.json();
        return {
            status: 200,
            jsonBody: data
        };

    } catch (err: any) {
        context.error(`Error en geoLocalizar: ${err.message}`);
        return { status: 500, jsonBody: { mensaje: "Error interno al geolocalizar" } };
    }
}

app.http('geoLocalizar', {
    methods: ['GET'],
    authLevel: 'anonymous',
    route: 'bo/geolocalizar',
    handler: geoLocalizar,
});
