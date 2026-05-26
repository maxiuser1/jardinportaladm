---
name: azure-function-get
description: Defines the strict coding rules and conventions for creating new Azure Functions GET endpoints. Applies to retrieving a single record mapped to a ViewModel.
---

# Azure Functions GET Endpoint Guidelines

Detailed instructions for generating Azure Functions GET endpoints using CosmosDB (or other databases) and mapping the results to secure ViewModels (VMs).

## When to use this skill

*   When instructed to create an endpoint that retrieves a single record by its ID for a specific entity.
*   When the requested endpoint name ends in `Get` (e.g., `entityGet`).

## Naming Conventions and Scope

### Prefixes
*   **`bo` (Tenant Context):** Functions used exclusively for a specific tenant. They MUST always filter by the tenant ID securely resolved from the authorization context.
*   **`adm` (Admin Context):** Global administration functions. They do NOT necessarily filter by tenant but may have global scope.

### Action Naming Pattern
`{prefix}{Entity}Get` (e.g., `boEntityGet`, `admEntityGet`). Note that the entity name is typically singular.

## Security and Multi-tenant Context

*   **Partition Key Handling:** Every tenant-specific GET request MUST extract the tenant from the JWT session or token authorization context using the authentication helper (e.g., `obtenerSession(request)`).
*   **Route Setup:** The route configuration for tenant-specific functions (`bo`) **MUST NOT** include the `{tenant}` ID in the path (e.g., use `route: 'bo/entities/{id}'` instead of `route: 'bo/{tenant}/entities/{id}'`). The tenant must be read securely from the authorization token and not exposed in the request URL.
*   **Point Read Strategy:** Use the record ID and Partition Key (tenant) for high-performance retrieval from CosmosDB.

```typescript
const { session, error } = obtenerSession(request);
if (error) return { status: error.status, jsonBody: { mensaje: error.message } };
const tenant = session!.tenant;
```

## View Model Mapping (Data Separation)

*   **Rule:** Never return the raw database container document directly to the client. This exposes audit logs, internal structures, and private data.
*   **Implementation:** Map the database entity to a specific View Model (`EntityDetalleVm`) under a `vm` root key in the response body.
*   **Structure:**
    ```typescript
    return { status: 200, jsonBody: { vm: mappedViewModel } };
    ```
