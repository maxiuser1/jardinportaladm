---
name: typescript-models
description: Defines the strict coding rules for creating and modifying TypeScript domain models in the API. Enforces single-type-per-file and no-comments rules.
---

# TypeScript Data Models Generator

Detailed instructions for structuring and formatting TypeScript data models (`types` or `interfaces`) within the `api/src/model/` directory of the JardinPortal application.

## When to use this skill

*   When generating a new data model object.
*   When editing an existing data model or breaking down a larger file into smaller pieces.
*   When importing models into other services, functions, or controllers.

## Core Architectural Rules

### 1. One Type Per File
Each TypeScript file in the `model` folder MUST contain **exactly one** exported `type` or `interface`. 

*   **Do not** group multiple types inside the same file (e.g., do not put `Jornada`, `Nivel`, and `Sala` in the same `logistica.ts`).
*   **Filename matching:** The filename must match the name of the type in `kebab-case` or lowercase (e.g., `LogisticaSucursal` should be in `logistica-sucursal.ts`, `Nivel` in `nivel.ts`).
*   If a model relies on nested objects (like an API response containing child entities), you must declare those child entities in their own separate files and import them.

### 2. Strictly No Comments
Model definitions must be clean, declarative, and self-documenting through their property names and typings.

*   **NEVER** include inline comments (`//`) or block comments (`/* */`) inside the type definitions.
*   If a property needs explanation, its name must be refactored to be self-explanatory.

### 3. Base Entities
If a model represents a document that will be stored in CosmosDB, it should typically extend the core base entity (e.g., `EntidadBase`) which provides typical auditing fields (`id`, `tenant`, `createdAt`, etc.) to ensure consistency.

### 4. No Hallucinations on Object Instantiation
When creating instances of these types in code (for example, in Azure Functions or Angular components), you MUST strictly adhere to the defined schema. 
*   **DO NOT invent or guess properties** (e.g., adding `tipo: 'familia'` if the `Familia` interface does not explicitly define a `tipo` property).
*   Always verify the imported model's exact structure using `view_file` BEFORE instantiating it, to avoid compile-time errors and phantom bugs.

### 5. Explicit Nullability (No Optional ?)
To ensure predictable payloads and explicit intent, do not use the optional operator (`?`) for property definitions in Models or ViewModels.

*   **Rule:** Use explicit union types with `null` if a property can be empty.
*   **Correct:** `valorSugerido: number | null;`
*   **Incorrect:** `valorSugerido?: number;`
*   **Why:** This forces the developer (and the API) to explicitly handle the absence of a value rather than relying on `undefined`, leading to more robust data contracts.

## Refactoring Note
If you encounter older files containing multiple type definitions (like legacy versions of the logistics models), your first step should be to extract the types into separate, dedicated files following the rules above, before making business logic changes.
