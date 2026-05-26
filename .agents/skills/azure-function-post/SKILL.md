---
name: azure-function-post
description: Defines the strict coding rules and conventions for creating new Azure Functions POST/PUT endpoints. Enforces the use of View Models (VM) to decouple incoming payloads from backend Domain Models.
---

# Azure Functions POST/PUT Endpoint Guidelines

Detailed instructions for generating Azure Functions POST/PUT endpoints that mutate data.

## 1. Decoupling Logic: Always Use a View Model (VM)

**NEVER** accept a core Domain Model directly from the request payload.
The data coming from the frontend is an expression of the *User Interface* (a form), which often flattens, groups, or simplifies data differently than how it is stored in the database.

### The Rule:
1.  **Define a Post VM**: Create a specific type for the incoming request (e.g., `EntityPostVm` in the `model/vm` folder) that EXACTLY matches the frontend form structure.
2.  **Cast to VM**: Parse the request body strictly into this VM.
   ```typescript
   const vm = await request.json() as EntityPostVm;
   ```
3.  **Map to Core Models**: Inside the Azure Function, write the explicit mapping logic to translate the `VM` properties into one or more Core Models.

## 2. Advantages of VM Mapping

*   **Security:** Prevents malicious users from injecting protected properties (e.g., `status: 'COMPLETED'`) directly into the database.
*   **Flexibility:** Allows the frontend form to evolve without forcing a database schema migration.
*   **Multi-document Operations:** A single POST request might need to map its fields to multiple logical tables/collections. A VM accommodates this cleanly.

## 3. Example Implementation

```typescript
export async function boEntityPost(request: HttpRequest, context: InvocationContext) {
  const { session, error } = obtenerSession(request);
  if (error) return { status: error.status, jsonBody: { mensaje: error.message } };
  const tenant = session!.tenant;

  // 1. Consume the View Model
  const vm = await request.json() as EntityPostVm;

  const database = db();
  
  // 2. Map VM properties to the actual Database Models
  const entityDoc: Entity = {
      id: generateId(),
      tenant: tenant,
      details: {
          code: vm.itemCode,
          name: vm.itemName
      },
      // ...
  };

  // 3. Persist the Domain Model
  await database.container(Contenedores.ENTITIES).items.create(entityDoc);
}
```

## 4. Avoiding Hallucinations
Never invent properties during the mapping phase. Always rely on the exact schema defined in the imported Core Model.

## 5. Security & Routes Configuration

*   **No tenant in URLs:** The route configuration for tenant-specific functions (`bo`) **MUST NOT** include `{tenant}` in the path (e.g., use `route: 'bo/entities'` instead of `route: 'bo/{tenant}/entities'`). The tenant must be obtained securely using `obtenerSession(request)`.
