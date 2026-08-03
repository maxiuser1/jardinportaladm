export type CrearJardinForm = {
  id: string;
  nombreComercial: string;
  razonSocial: string;
  ruc: string;
  correoFacturacion: string;
  responsablePago: string;
  moneda: 'CLP' | 'UF' | '';
  vigenciaCotizacion: number;
  periodoDesde: string;
  periodoHasta: string;
  usuarioNombres: string;
  usuarioApellidos: string;
  usuarioCorreo: string;
  usuarioClave: string;
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
  periodoDesde: '01-01',
  periodoHasta: '31-12',
  usuarioNombres: '',
  usuarioApellidos: '',
  usuarioCorreo: '',
  usuarioClave: '',
};
