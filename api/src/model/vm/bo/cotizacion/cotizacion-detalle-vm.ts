import { Direccion } from "../../../direccion";

export type CotizacionDetalleVm = {
  id: string;
  creadoEn: string;
  tipoCotizacion: 'familia' | 'empresa' | 'intermediario';
  empresa: { ruc: string; razonSocial: string } | null;
  nino: {
    rut: number | null;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    fechaNacimiento: string;
  };
  apoderado: {
    rut: number | null;
    nombres: string;
    apellidoPaterno: string;
    apellidoMaterno: string;
    telefono: string;
    correo: string;
    direccion: Direccion;
  };
  contexto: {
    nivelNombre: string;
    jornadaNombre: string;
    salaId: string | null;
    fechaIngreso: string;
  };
  formaPago: 'MENSUAL' | 'ANUAL';
  mesesContratados: number;
  items: {
    servicioId: string;
    nombre: string;
    categoria: 'MATRICULA' | 'MENSUALIDAD' | 'ADICIONAL';
    precioBase: number;
    descuentoManual: number;
    precioFinal: number;
    moneda: string;
    observacion: string;
  }[];
  total: number;
  moneda: string;
  estado: 'PENDIENTE' | 'ENVIADA' | 'ACEPTADA' | 'VENCIDA';
  fechaVencimiento: string;
  comoNosConociste: string;
};
