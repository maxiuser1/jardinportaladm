import { required, email, maxLength } from '@angular/forms/signals';

export const ingresoSchema = (sp: any) => {
  required(sp.correo, { message: 'El correo es obligatorio' });
  email(sp.correo, { message: 'Debe ser un correo válido' });
  required(sp.clave, { message: 'La clave es obligatoria' });
  maxLength(sp.correo, 400, { message: 'El correo debe tener menos de 400 caracteres' });
  maxLength(sp.clave, 100, { message: 'La clave debe tener menos de 100 caracteres' });
};
