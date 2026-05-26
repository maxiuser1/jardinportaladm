export type EditarJardinForm = {
  nombreComercial: string;
  razonSocial: string;
  ruc: string;
  correoFacturacion: string;
  responsablePago: string;
  moneda: 'CLP' | 'UF' | '';
  vigenciaCotizacion: number;
};

export const EDITAR_JARDIN_DEFAULT: EditarJardinForm = {
  nombreComercial: '',
  razonSocial: '',
  ruc: '',
  correoFacturacion: '',
  responsablePago: '',
  moneda: '',
  vigenciaCotizacion: 15,
};
