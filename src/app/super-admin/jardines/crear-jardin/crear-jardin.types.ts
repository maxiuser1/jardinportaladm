export type CrearJardinForm = {
  id: string;
  nombreComercial: string;
  nombreSucursal: string;
  razonSocial: string;
  ruc: string;
  correoFacturacion: string;
  responsablePago: string;
  moneda: 'CLP' | 'UF' | '';
  codigoAutorizacionDescuento: string;
  vigenciaCotizacion: number;
  periodoDesde: string;
  periodoHasta: string;
  usuarioNombres: string;
  usuarioApellidos: string;
  usuarioCorreo: string;
  usuarioClave: string;
  estilosRutaLogo: string;
  estilosPrimary: string;
  estilosSecondary: string;
  estilosAccent: string;
};

export const CREAR_JARDIN_DEFAULT: CrearJardinForm = {
  id: '',
  nombreComercial: '',
  nombreSucursal: '',
  razonSocial: '',
  ruc: '',
  correoFacturacion: '',
  responsablePago: '',
  moneda: '',
  codigoAutorizacionDescuento: '',
  vigenciaCotizacion: 15,
  periodoDesde: '01-01',
  periodoHasta: '31-12',
  usuarioNombres: '',
  usuarioApellidos: '',
  usuarioCorreo: '',
  usuarioClave: '',
  estilosRutaLogo: '',
  estilosPrimary: '#4f46e5',
  estilosSecondary: '#0f172a',
  estilosAccent: '#22c55e',
};
