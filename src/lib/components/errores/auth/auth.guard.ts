import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);


  // Redirigir al ingreso si no está autenticado
  router.navigate(['/ingreso']);
  return false;
};
