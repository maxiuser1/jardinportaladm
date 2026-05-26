---
name: angular-requests
description: Convenciones para realizar peticiones HTTP en Angular usando httpResource y HttpClient de forma genérica y segura.
---

# Angular Requests Skill

Este skill define las reglas obligatorias para implementar la comunicación con el Backend desde la aplicación Angular.

## 1. Uso de Base URL (Environments)

Nunca se deben hardcodear URLs directamente en los componentes o servicios. Se debe importar el archivo `environment` y utilizar la propiedad configurada para la API.

```typescript
import { environment } from 'src/environments/environment';

// Correcto
const url = `${environment.api}bo/entidad/accion`;

// INCORRECTO
const url = `http://localhost:7071/api/bo/entidad/accion`;
```

## 2. Tipado y Alias (`@model`)

Para mantener la consistencia entre el Backend y Frontend, se deben utilizar los modelos definidos en la carpeta compartida de modelos usando el alias `@model`.

*   **Regla:** Siempre tipar las respuestas de los recursos o servicios.
*   **Importación:** `import { MiModelo } from '@model/mi-modelo';`

## 3. Preferencia por `httpResource`

En Angular 19+, se prefiere el uso de `httpResource` para peticiones de lectura (GET) que alimentan la vista, ya que gestiona automáticamente los estados de carga y error como Signals.

```typescript
import { httpResource } from '@angular/common/http';
import { AppStore } from '../../state/app.state';

export class MiComponente {
  readonly store = inject(AppStore);

  // El recurso reaccionará automáticamente si las señales internas cambian.
  // NOTA: El tenantId no debe pasarse por URL, el backend lo obtiene del token.
  entidad = httpResource<MiModelo>(() => `${environment.api}bo/accion`);
}
```

> [!WARNING]
> **No utilices `effect()`** para reaccionar a la respuesta de un `httpResource` o para encadenar peticiones HTTP. En su lugar:
> - Define los parámetros de entrada del `httpResource` como señales reactivas o `computed()` para que la petición se ejecute y actualice de forma reactiva y automática.
> - Si requieres disparar acciones colaterales tras la carga exitosa de una petición, maneja la lógica dentro del flujo de suscripción en llamadas imperativas (`HttpClient.get().subscribe(...)`) o utiliza operadores RxJS.

## 4. Convenciones de Rutas y Seguridad de Multi-tenancy

Las rutas deben estructurarse de manera que los identificadores de seguridad (como el ID del Tenant) no se expongan en la URL pública:
*   **Rutas Privadas/Multi-tenant (`bo/`)**: El ID del Tenant **nunca** debe formar parte de la URL (ej: `bo/{tenant}/personas` está PROHIBIDO). En su lugar, el backend extrae el Tenant ID de forma segura desde la sesión (JWT / Cabecera de autorización).
*   **Rutas Administrativas (`adm/`)**: Para operaciones de alcance global.

Ejemplo de llamada en frontend:
```typescript
// Correcto
const url = `${environment.api}bo/entidad/accion`;
```

## 5. Manejo de Parámetros

*   **Path Params:** Usar literales de plantilla (Template Literals) para inyectar IDs o Slugs.
*   **QueryParams:** Pasar un objeto como segundo argumento si se usa `httpResource` o configurar `params` en el `HttpClient`.
