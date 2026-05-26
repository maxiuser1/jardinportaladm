import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  console.log('authguard', authService.estaAutenticado());
  if (authService.estaAutenticado()) {
    return true;
  }

  router.navigate(['/ingreso']);
  return false;
};
