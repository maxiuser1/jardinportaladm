# Product Requirements Document (PRD) - JardinPortal MVP

## 1. Visión del Producto
JardinPortal es un sistema SaaS diseñado para centralizar y automatizar la gestión administrativa de los jardines infantiles. El objetivo de este MVP es eliminar el papeleo y las hojas de cálculo en los procesos clave de venta y operación: cotización, matrícula y cobros mensuales.

## 2. Personas (Usuarios Objetivo)
El MVP está diseñado exclusivamente para uso interno del jardín (Backoffice). **No incluye portal para apoderados/padres.**

### 2.1 Supervisor
*   **Perfil:** Administrador del negocio, dueño o director general.
*   **Necesidades:** Definir las reglas del juego (sucursales, salas, niveles) y establecer el tarifario corporativo. Monitorear las operaciones.
*   **Permisos:** Acceso total al tenant.

### 2.2 Ejecutivo
*   **Perfil:** Personal administrativo, de recepción o ventas.
*   **Necesidades:** Herramientas rápidas para atender a un padre, generar una cotización precisa sin errores de cálculo, y transformar esa venta en una matrícula activa.
*   **Permisos:** Limitado a la operativa diaria (Cotizaciones, Matrículas, Registro de Pagos manuables).

## 3. Problemas a Resolver
1.  **Errores en cobros:** Discrepancias entre lo pactado al matricular y lo que se cobra mes a mes.
2.  **Lentitud comercial:** Dificultad para generar cotizaciones rápidas basadas en reglas dinámicas (nivel del niño + jornada elegida).
3.  **Falta de Trazabilidad:** Pérdida del historial de la relación con la familia (quién autoriza retiros, responsables de pago).

## 4. Alcance del MVP (In/Out)

✅ **Incluido en el MVP:**
*   Gestión multi-sucursal y multi-tenant.
*   Configuración de Estructura Logística (Salas, Niveles).
*   Configuración de Tarifario (Pricing Lineal).
*   Motor de Cotizaciones y conversión a Matrículas.
*   Emisión teórica de Pagos Mensuales y registro de su liquidación.

❌ **Fuera del Alcance del MVP:**
*   Portal o App para Apoderados.
*   Pasarelas de Pago online (Webpay, Stripe).
*   Control de Asistencia Biométrico / App móvil para profesores.
*   Facturación Electrónica en este hito de MVP.

## 5. Épicas (High-Level Features)
*   **Épica 1:** Configuración del Entorno (Logística y Tarifario).
*   **Épica 2:** Flujo de Venta Previa (Ingreso de prospectos y Cotización).
*   **Épica 3:** Cierre y Operación (Matrículas y Estado de Cuenta mensual).
