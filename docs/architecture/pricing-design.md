# Diseño de Pricing

Este documento describe cómo se configura y consulta el precio de los servicios educativos en JardinPortal.

## 📐 Modelo de Precio

Un `Precio` representa el valor de un servicio educativo para una combinación específica de parámetros logísticos. La clave de búsqueda es exacta y está formada por:

| Campo | Descripción |
|---|---|
| `tenant` | Identificador del jardín (aislamiento multi-tenant) |
| `sucursalId` | Sede donde se prestará el servicio |
| `nivelId` | Nivel educativo del niño (ej. Sala Cuna, Medio Menor) |
| `jornadaId` | Jornada seleccionada (ej. Mañana, Completa) |

El tipo de servicio (`tipo`) solo puede ser:
- `MATRICULA` — cobro único de inscripción anual
- `MENSUALIDAD` — cobro mensual recurrente

## 💵 Valor y Moneda

El campo `valor` es un monto numérico. La moneda se expresa en el campo `moneda` y puede ser:
- `CLP` — Pesos chilenos
- `UF` — Unidad de Fomento

## 🗓️ Vigencia

Cada precio tiene un rango de fechas que define su período de validez:

```
fechaInicioVigencia <= hoy <= fechaFinVigencia
```

El motor de búsqueda siempre debe filtrar por vigencia activa. Esto permite configurar tarifarios futuros sin afectar el período en curso.
