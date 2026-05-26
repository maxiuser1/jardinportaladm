---
name: Angular Signal Forms
description: Guía de implementación y buenas prácticas para crear formularios basados en Signals, incluyendo modelos y validaciones, de manera genérica.
---

# Angular Signal Forms

Este skill define el patrón de implementación de Signal Forms en el proyecto. Estos formularios simplifican los tradicionales `ReactiveForms` (`FormGroup`, `FormControl`) utilizando la reactividad optimizada de Signals.

## 1. Definición de Tipos y Modelos (`[feature].types.ts`)

Siempre se debe definir el tipo del formulario (`Type`) y exportar su estado inicial (`DEFAULT`). Esto garantiza el tipaje y limpieza en la inicialización sin valores predeterminados problemáticos.

```typescript
export type FormularioGenerico = {
  nombres: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
};

export const FORMULARIO_DEFAULT: FormularioGenerico = {
  nombres: '',
  apellidoPaterno: '',
  apellidoMaterno: '',
};
```

## 2. Esquema de Validaciones (`[feature].schema.ts`)

El esquema se centraliza en un archivo separado para validaciones donde se importa la API del signal (como `required`, `readonly`, `minLength`, `pattern`, etc.). El esquema recibe las propiedades genéricas (`sp`) que mapean al objeto del type principal.

```typescript
import { readonly, required } from '@angular/forms/signals';

export const FORMULARIO_SCHEMA = (sp: any) => {
  readonly(sp.numeroDocumento);
  required(sp.nombres, { message: 'Ingrese sus nombres' });
  required(sp.apellidoPaterno, { message: 'Ingrese su apellido paterno' });
};
```

## 3. Integración en el Componente Principal (`[feature].ts`)

### A. Declaraciones Iniciales
El componente almacena la instancia del signal y el form propiamente validado.

```typescript
import { form } from '@angular/forms/signals';
import { FORMULARIO_DEFAULT } from './formulario.types';
import { FORMULARIO_SCHEMA } from './formulario.schema';

// Modelo base que contendrá los valores de la data
model = signal<FormularioGenerico>(FORMULARIO_DEFAULT);

// Wrapper del Signal Form que lee las validaciones
form = form(this.model, FORMULARIO_SCHEMA);
```

### B. Inicialización o Carga de Datos Externa

> [!WARNING]
> **No utilizar Signal effects (`effect()`)** para sincronizar o reaccionar a cambios en el formulario. Los `effect()` se ejecutan de manera asíncrona y pueden provocar bucles infinitos de actualización de estado que son difíciles de depurar. En su lugar:
> - Utiliza señales computadas (`computed()`) para derivar valores de manera síncrona.
> - Ejecuta actualizaciones programáticas directamente en los métodos de ciclo de vida (como `ngOnInit` o cuando se resuelven recursos HTTP/promesas).
> - Asocia manejadores de eventos directos en la vista (por ejemplo, a través de directivas de Angular o bindings).

### C. Parcheo Parcial (Partial Updates) en el Submit
Para el guardado de datos y mutaciones de formulario hacia el servidor, Signal Forms detecta de manera reactiva el estado `dirty` de sus controles en su árbol interno de validación. 
El estándar estipula utilizar el patrón de parches para enviar únicamente la data que ha cambiado.

```typescript
async onSubmit(event: Event) {
  event.preventDefault();

  if (!this.form().valid() || this.cargando()) return;

  let ops: OperationPatch[] = [];

  if (this.form.nombres().dirty()) {
    ops.push({ path: 'nombres', value: this.form.nombres().value() });
  }
  if (this.form.apellidoPaterno().dirty()) {
    ops.push({ path: 'apellidoPaterno', value: this.form.apellidoPaterno().value() });
  }

  if (ops.length === 0) return;

  this.cargando.set(true);
  try {
    await firstValueFrom(this.service.patch({ ops }));
  } catch (ex) {
    console.error('Error', ex);
  } finally {
    this.cargando.set(false);
  }
}
```

### D. Programmatic updates (Setters)
Si necesitas actualizar el valor de un campo programáticamente (por ejemplo, basado en la selección de otro campo), debes acceder al signal `value` dentro del estado del campo.

*   **Correcto:** `this.form.campo().value.set(nuevoValor);`
*   **Incorrecto:** `this.form.campo.set(nuevoValor);` o `this.form.campo().set(nuevoValor);`

## 4. Manejo de Errores Visuales

Para mostrar mensajes de validación dentro de un `mat-form-field`, se debe utilizar el componente/directiva `Errores` sobre un elemento `mat-error`. 

**Regla de Oro:** Siempre pasar el `fieldState` llamando a la señal del campo (ej. `form.campo()`).

```html
<mat-form-field>
  <mat-label>Nombres</mat-label>
  <input matInput [formField]="form.nombres">
  <mat-error errores [fieldState]="form.nombres()"></mat-error>
</mat-form-field>
```

**Antipatrón a evitar:** No usar etiquetas personalizadas como `<errores>` ni pasar el objeto de la señal sin ejecutar (ej. `[fieldState]="form.nombres"` está mal).

## 5. Estructuras Planas y Tipado Estricto (Manejo de Nulls)

Las interfaces de API a menudo traen datos anidados o valores `null`. Signal Forms, al enlazarse a la vista mediante directivas como `[formField]`, requiere ciertas convenciones para no romper el compilador de Angular (ej. `<input matInput>` lanza error si la señal entrega un tipo `| null` o si se intenta leer deep paths en el template).

**Mecánica Obligatoria a seguir:**
1. **Aplanar la estructura visual:** El type del Form (`[feature].types.ts`) **NO debe contener objetos anidados**. Las sub-propiedades del backend deben llevarse al primer nivel (ej: obj `origenFondos: { ahorro: boolean }` se vuelve `ofAhorro: boolean` en el type local).
2. **Rechazar el tipo `null` en Types:** En lugar de propiedades como `string | null` o `number | null`, el Form Type debe declararse y definir defaults `string` (`''`) y `number | undefined` o `boolean | undefined`. Material UI y Forms consumen perfectamente inicializadores vacíos o `undefined`. 
3. **Mapeo Bilateral Manual:**
   - **En `onSubmit()` (Guardado):** Transformar los `undefined` u `''` de nuevo a `null` al empujar valores re-empaquetados hacia los objetos anidados con formato natural del API Payload.

Ejemplo en el guardado:
```typescript
if (this.form.ofOtrosDetalle().dirty()) {
  ops.push({
    path: 'origenFondos',
    value: {
      ahorro: this.form.ofAhorro().value(),
      otrosDetalle: this.form.ofOtrosDetalle().value() || null
    }
  });
}
```

## API Rápida de Uso
- **`model.set(value)`**: Inicializar el modelo con data nueva (sobrescribe todo).
- **`this.form.propiedad().value.set(val)`**: Establece un nuevo valor de forma programática.
- **`this.form.propiedad().value()`**: Valor tipado y reactivo de la propiedad deseada.
- **`this.form.propiedad().dirty()`**: Identifica si un control en particular ha tenido iteración en el DOM.
- **`this.form().valid()`**: Verificador final según el esquema `[FEATURE]_SCHEMA`.
