# Arquitectura del Sistema - JardinPortal

Este documento describe la base técnica y estructural del sistema, soportando los requerimientos definidos en el `PRD.md`.

## 🏗️ Stack Tecnológico
* **Frontend:** Angular
* **Backend:** Azure Functions v4 (TypeScript)
* **Base de Datos:** Azure CosmosDB (NoSQL)

## 📁 Estructura de Carpetas
* **Backend:** `api/src/functions/` (Azure Functions)
* **Frontend:** `src/app/` (Componentes y servicios Angular)
* **Modelos:** `api/src/model/` (Definiciones TypeScript en español independientes, exactamente 1 tipo por archivo)
* **View Models (VM):** `api/src/model/vm/bo/` (Contratos de entrada/salida para las Azure Functions del Backoffice)
* **Especificaciones (SDD):** `docs/specs/features/` (Contratos de comportamiento)

## 🧱 Convenciones de Nomenclatura (Funciones)
Para facilitar la separación futura de aplicaciones, las Azure Functions siguen este patrón: `{prefijo}{Entidad}{Accion}`.

*   **Prefix `bo` (Backoffice):** Operaciones aisladas por tenant (Ej: `boSucursalGet`). Siempre requieren header `x-tenant`.
*   **Prefix `adm` (Admin):** Gestión global del SaaS (Ej: `admJardinPost`). No requieren aislamiento por tenant externo.

## 🌐 Convenciones de Frontend / Routing
Para garantizar la compatibilidad y evitar errores de codificación en navegadores, las rutas (URLs) deben estar saneadas:

*   **Minúsculas:** Todas las rutas deben definirse en minúsculas.
*   **Sin caracteres especiales:** No se deben usar tildes, eñes (ñ) ni otros caracteres especiales.
    *   *Ejemplo:* Usar `/ninos` en lugar de `/niños`.
*   **Kebab-case:** Usar guiones para separar palabras en rutas compuestas (Ej: `/nueva-cotizacion`).

---

## 🔑 Identificadores y Particionamiento

### Clave de Partición (Partition Key)
* **Contenedores Multi-tenant:** Usan `/tenant` para aislamiento de datos.
* **Contenedor Global (`jardines`):** Usa `/id` como Partition Key, ya que representa el catálogo maestro de clientes del SaaS.

---

## 🧩 Contenedores en CosmosDB

El almacenamiento está dividido funcionalmente para optimizar costos y escalabilidad:

| # | Contenedor | Partition Key | Descripción |
|---|---|---|---|
| 1 | **jardines** | `/id` | (Global) Catálogo maestro de tenants, datos de facturación, estilos y el **array de Intermediarios** (convenios). |
| 2 | **sucursales** | `/tenant` | (Multi-tenant) Datos logísticos: `nombre`, `direccion`, y arrays embebidos de `niveles`, `jornadas`, `salas` y `servicios` del catálogo local. |
| 3 | **precios** | `/tenant` | (Multi-tenant) Matriz CORE de precios (`MATRICULA` / `MENSUALIDAD`). Cruza `sucursalId` + `nivelId` + `jornadaId`. La resolución de precios por intermediario se maneja a nivel de aplicación. |
| 4 | **precios_adicionales** | `/tenant` | (Multi-tenant) Tarifario flexible para ítems variables (Talleres, Comedor, etc.). Se cruzan por `sucursalId` + `servicioId`. |
| 5 | **ninos** | `/tenant` | Datos del infante: identidad, estado de matrícula y referencia a su familia. |
| 6 | **familias** | `/tenant` | Agrupador social: apoderados, responsables de pago y autorizados de retiro. |
| 7 | **cotizaciones** | `/tenant` | Borradores y ofertas comerciales. Incluye snapshot del contexto logístico, items de precio, `formaPago` y `mesesContratados` pactados. |
| 8 | **servicios_nino** | `/tenant` | Contratos activos de un niño: condiciones pactadas, vigencias y **Plan de Pagos (Cuotas)** proyectado. |
| 9 | **pagos** | `/tenant` | Registro de transacciones reales que liquidan cuotas del plan de pagos. |
| 10 | **usuarios** | `/tenant` | Cuentas de acceso: credenciales, roles y sucursales asignadas (con ID y nombre embebido). |

> **Nota:** No existe un contenedor separado `configuraciones`. La logística operativa (niveles, jornadas, salas, servicios) se almacena directamente en los documentos del contenedor `sucursales` como arrays embebidos.

---

## 🗺️ Mapa de Modelos → Contenedores

| Modelo TypeScript | Contenedor CosmosDB | Notas |
|---|---|---|
| `Jardin` | `jardines` | Incluye array de `Intermediario[]` embebido |
| `Sucursal` | `sucursales` | Incluye `Nivel[]`, `Jornada[]`, `Sala[]`, `Servicio[]` embebidos |
| `Precio` | `precios` | Campo `intermediarioId` presente si es precio de convenio |
| `PrecioAdicional` | `precios_adicionales` | |
| `Nino` | `ninos` | |
| `Familia` | `familias` | Incluye `Apoderado[]` y `AutorizadoRetiro[]` embebidos |
| `Cotizacion` | `cotizaciones` | Snapshot histórico; incluye `formaPago` y `mesesContratados` |
| `ServicioNino` | `servicios_nino` | Incluye `CuotaPago[]` embebido |
| `Pago` | `pagos` | Liquida cuotas del `ServicioNino` |
| `Usuario` | `usuarios` | |
