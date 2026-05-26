export type CrearJardinForm = {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  ruc: string;
  correoFacturacion: string;
  responsablePago: string;
  moneda: 'CLP' | 'UF' | '';
  vigenciaCotizacion: number;
};

export const CREAR_JARDIN_DEFAULT: CrearJardinForm = {
  id: '',
  nombreComercial: '',
  razonSocial: '',
  ruc: '',
  correoFacturacion: '',
  responsablePago: '',
  moneda: '',
  vigenciaCotizacion: 15,
};
