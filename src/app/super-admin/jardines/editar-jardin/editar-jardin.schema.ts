import { required, email, pattern } from '@angular/forms/signals';

export const editarJardinSchema = (sp: any) => {
  required(sp.nombreComercial, { message: 'El nombre comercial es requerido' });
  required(sp.razonSocial, { message: 'La razón social es requerida' });
  required(sp.ruc, { message: 'El RUC es requerido' });
  required(sp.correoFacturacion, { message: 'El correo de facturación es requerido' });
  email(sp.correoFacturacion, { message: 'Debe ser un correo válido' });
  required(sp.responsablePago, { message: 'El responsable de pago es requerido' });
  required(sp.moneda, { message: 'La moneda es requerida' });
  required(sp.codigoAutorizacionDescuento, { message: 'El código de autorización es requerido' });
  pattern(sp.codigoAutorizacionDescuento, /^\d{6}$/, { message: 'El código debe tener 6 dígitos numéricos' });
  required(sp.vigenciaCotizacion, { message: 'La vigencia de cotización es requerida' });
  required(sp.periodoDesde, { message: 'El periodo de inicio es requerido' });
  required(sp.periodoHasta, { message: 'El periodo de fin es requerido' });
};
