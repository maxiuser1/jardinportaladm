---
name: azure-function-list
description: Defines the strict coding rules and conventions for creating new Azure Functions LIST endpoints. Applies to retrieving multiple records using a Criterion filter object via an HTTP POST method.
---

# Azure Functions LIST Endpoint Guidelines

Detailed instructions for generating Azure Functions LIST endpoints using CosmosDB (or other databases) with dynamic query criteria.

## When to use this skill

*   When instructed to create an endpoint that retrieves a list of records with support for pagination, sorting, and dynamic filtering.
*   When the requested endpoint name ends in `List` (e.g., `entityList`).

## Naming Conventions and Scope

### Prefixes
*   **`bo` (Tenant Context):** Functions used exclusively for a specific tenant. They MUST always filter by the tenant ID securely resolved from the authorization context.
*   **`adm` (Admin Context):** Global administration functions. They do NOT necessarily filter by tenant but may have global scope.

### Action Naming Pattern
`{prefix}{Entity}List` (e.g., `boEntitiesList`, `admEntitiesList`). Note that the entity name is typically plural.

## Architectural Rules

1.  **Method:** A `List` endpoint MUST use the **POST** method.
2.  **Payload:** It consumes a `Criterion` JSON object in the request body to handle sorting, limits, offsets, and dynamic filtering.
3.  **Pagination:** The response must structure data as `{ items: [...], total: number, limit: number, offset: number }`.
4.  **Security (bo Prefix):** Every tenant-specific request MUST extract the tenant from the JWT session or token authorization context using the authentication helper (e.g., `obtenerSession(request)`) AND append the tenant filter parameter to the database query parameters.

```typescript
const { session, error } = obtenerSession(request);
if (error) return { status: error.status, jsonBody: { mensaje: error.message } };
const tenant = session!.tenant;
```
