export type EditarJardinForm = {
  nombreComercial: string;
  razonSocial: string;
  ruc: string;
  correoFacturacion: string;
  responsablePago: string;
  moneda: 'CLP' | 'UF' | '';
  codigoAutorizacionDescuento: string;
  vigenciaCotizacion: number;
  periodoDesde: string;
  periodoHasta: string;
};

export const EDITAR_JARDIN_DEFAULT: EditarJardinForm = {
  nombreComercial: '',
  razonSocial: '',
  ruc: '',
  correoFacturacion: '',
  responsablePago: '',
  moneda: '',
  codigoAutorizacionDescuento: '',
  vigenciaCotizacion: 15,
  periodoDesde: '01-01',
  periodoHasta: '31-12',
};
