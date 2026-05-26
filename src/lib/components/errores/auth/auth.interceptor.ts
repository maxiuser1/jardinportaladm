import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('tokenadm');
  if (token) {
    const cloned = req.clone({
      setHeaders: {
        'x-custom-authorization': `Bearer ${token}`,
      },
    });
    return next(cloned);
  }

  return next(req);
};
