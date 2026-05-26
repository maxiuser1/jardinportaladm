# Especificación de Feature: Configuración Logística (Setup del Jardín)

## 🎯 Meta
Permitir a los *Supervisores* definir y actualizar la estructura logística de cada sucursal de su jardín (niveles, jornadas, salas y catálogo de servicios), para habilitar la operación comercial (cotizaciones/matrículas).

## 👤 Actor Principal
Supervisor

## 🏛️ Arquitectura
La configuración logística NO se almacena en un contenedor `configuraciones` separado. Cada documento en el contenedor **`sucursales`** (`Partition Key: /tenant`) es autosuficiente e incluye arrays embebidos de:
- `niveles: Nivel[]`
- `jornadas: Jornada[]`
- `salas: Sala[]`
- `servicios: Servicio[]` (catálogo de servicios ofrecidos por esa sucursal)

---

## 📋 Escenarios (Specification)

### Escenario 1: Creación o Actualización de una Sucursal
**Contexto:** Un jardín con tenant `sol-de-oro` necesita registrar o actualizar una sucursal con su estructura base.
**Acción:** El Supervisor envía un payload `PUT` con la configuración completa de la sucursal.
**Resultado Esperado:**
1. El sistema valida que el `id` de la sucursal tenga formato slug (solo minúsculas, guiones, sin espacios) y no esté vacío.
2. El sistema valida que los IDs de `niveles`, `jornadas` y `salas` no estén duplicados dentro del payload.
3. El sistema sobrescribe o crea el documento `Sucursal` en el contenedor `sucursales` con `PartitionKey = tenant`.
4. Retorna un mensaje de éxito con la fecha de actualización.

### Escenario 2: Validación de IDs Duplicados
**Contexto:** El Supervisor intenta enviar dos salas con el mismo `id` (`sala-azul`) dentro de una sucursal.
**Acción:** El Supervisor envía el payload.
**Resultado Esperado:**
1. El servidor rechaza la petición con HTTP 400 (Bad Request).
2. El mensaje especifica qué entidad y qué ID está duplicado: `"Error: El id de sala 'sala-azul' está duplicado"`.

---

## 🔌 Contrato de API (REST)

**Endpoint:** `PUT /api/boSucursalPut`
**Headers Requeridos:** `x-tenant: string`

### Payload de Entrada (Request Body)
```json
{
  "id": "providencia-1",
  "nombre": "Sede Principal Providencia",
  "direccion": "Avenida Providencia 123",
  "niveles": [
    { "id": "sala-cuna", "nombre": "Sala Cuna", "edadMin": 0, "edadMax": 1 },
    { "id": "medio-menor", "nombre": "Medio Menor", "edadMin": 2, "edadMax": 2 }
  ],
  "jornadas": [
    { "id": "manana", "nombre": "Media Jornada Mañana" },
    { "id": "completa", "nombre": "Jornada Completa" }
  ],
  "salas": [
    { "id": "sala-azul", "nombre": "Salita Azul", "capacidad": 15 },
    { "id": "sala-verde", "nombre": "Salita Verde", "capacidad": 20 }
  ],
  "servicios": [
    { "id": "srv-matricula", "nombre": "Matrícula Anual", "categoria": "MATRICULA" },
    { "id": "srv-mensualidad", "nombre": "Mensualidad Educativa", "categoria": "MENSUALIDAD" }
  ]
}
```

### Respuesta de Éxito (HTTP 200 OK)
```json
{
  "success": true,
  "data": {
    "mensaje": "Sucursal guardada exitosamente",
    "actualizadoEn": "2026-04-23T22:15:00Z"
  }
}
```
