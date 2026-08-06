import { required, email, readonly } from '@angular/forms/signals';

export const crearJardinSchema = (sp: any) => {
  readonly(sp.id);
  required(sp.id, { message: 'El ID/Slug es requerido' });
  required(sp.nombreComercial, { message: 'El nombre comercial es requerido' });
  required(sp.nombreSucursal, { message: 'El nombre de la sucursal es requerido' });
  required(sp.razonSocial, { message: 'La razón social es requerida' });
  required(sp.ruc, { message: 'El RUC es requerido' });
  required(sp.correoFacturacion, { message: 'El correo de facturación es requerido' });
  email(sp.correoFacturacion, { message: 'Debe ser un correo válido' });
  required(sp.responsablePago, { message: 'El responsable de pago es requerido' });
  required(sp.moneda, { message: 'La moneda es requerida' });
  required(sp.vigenciaCotizacion, { message: 'La vigencia de cotización es requerida' });
  required(sp.periodoDesde, { message: 'El periodo de inicio es requerido' });
  required(sp.periodoHasta, { message: 'El periodo de fin es requerido' });
  required(sp.usuarioNombres, { message: 'El nombre del usuario es requerido' });
  required(sp.usuarioApellidos, { message: 'El apellido del usuario es requerido' });
  required(sp.usuarioCorreo, { message: 'El correo del usuario es requerido' });
  email(sp.usuarioCorreo, { message: 'Debe ser un correo válido' });
  required(sp.usuarioClave, { message: 'La contraseña del usuario es requerida' });
  required(sp.estilosPrimary, { message: 'El color primario es requerido' });
  required(sp.estilosSecondary, { message: 'El color secundario es requerido' });
  required(sp.estilosAccent, { message: 'El color de acento es requerido' });
};
