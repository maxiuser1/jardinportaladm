---
name: angular-global-store
description: Convenciones para el uso de SignalStore (NgRx SignalStore) como fuente de verdad para el estado global de la aplicación.
---

# Global SignalStore (NgRx SignalStore)

`AppStore` (o la implementación local de NgRx SignalStore) es la fuente única de verdad para el estado global de la aplicación. Gestiona los datos del usuario autenticado, el tenant activo y el contexto de sesión global.

## Estructura del Estado

El estado global típicamente contiene:
- `entidadSeleccionadaId`: ID de la entidad contextual seleccionada de forma global.
- `tenant`: ID del tenant activo para la seguridad de multi-tenancy.
- `usuario`: Información del perfil de usuario (nombre, correo, roles).
- `contextosDisponibles`: Lista de contextos o roles asignados disponibles para el usuario.

## Uso en Componentes

Para acceder al estado, inyecta el Store en el componente. Al ser un SignalStore, puedes acceder a las propiedades directamente como Signals reactivas.

```typescript
import { inject } from '@angular/core';
import { AppStore } from '../../state/app.state';

export class MiComponente {
  readonly store = inject(AppStore);

  // Uso en el template o código
  // this.store.entidadSeleccionadaId()
  // this.store.tenant()
}
```

## Eventos y Despacho

El store puede utilizar `@ngrx/signals/events` o acciones directas para manejar operaciones asíncronas y mutaciones de estado de forma controlada.

### Ejemplo de despacho tras Login o Cambio de Contexto

```typescript
import { inject } from '@angular/core';
import { Dispatcher } from '@ngrx/signals/events';
import { appEvents } from '../../state/app.state';

const dispatcher = inject(Dispatcher);
dispatcher.dispatch(appEvents.usuarioCargado(userResp));
```

## Reglas Críticas

1. **NO utilizar `effect()` de Signals** para propagar cambios de estado del Store a otros componentes o flujos de trabajo. En su lugar, usa señales calculadas (`computed()`) para transformar/derivar estado, o suscríbete/reacciona a los eventos del Store de forma explícita mediante flujos RxJS o controladores de eventos.
2. **NO persistir estado manualmente** en el almacenamiento local (`localStorage`) de manera desordenada; el Store debe encargarse de su propia hidratación o almacenamiento si es necesario.
3. **SIEMPRE** usar el Store como la única fuente de verdad para parámetros transversales de seguridad (como `tenantId` o IDs de sesión).
