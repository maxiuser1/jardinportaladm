import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, throwError } from 'rxjs';
import { SKIP_ERROR_DIALOG_URLS } from './http.constants';
import { Confirmacion } from '../../../lib/components/confirmacion/confirmacion';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const dialog = inject(MatDialog);
  const skipErrorDialog = SKIP_ERROR_DIALOG_URLS.some((url) => req.url.includes(url));

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (!skipErrorDialog) {
        dialog.open(Confirmacion, {
          data: {
            message: error?.error?.error || error?.message || 'Ocurrió un error, vuelve a intentarlo en unos minutos',
          },
        });
      }
      return throwError(() => error);
    }),
  );
};
