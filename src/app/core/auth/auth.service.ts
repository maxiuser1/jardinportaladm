import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { AuthResponse, IngresoRequest } from '../../publico/ingreso/ingreso.types';
import { firstValueFrom, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { UsuarioVm } from '@model/vm/bo/usuario-vm';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);

  async login(payload: IngresoRequest): Promise<boolean> {
    const resp = await firstValueFrom(this.http.post<AuthResponse>(`${environment.api}bo/login`, payload));
    if (resp.token) {
      localStorage.setItem('tokenadm', resp.token);
      return true;
    }
    return false;
  }

  me(): Observable<UsuarioVm> {
    console.log('authgservice me');
    return this.http.get<UsuarioVm>(`${environment.api}adm/me`, {
      headers: {
        'x-custom-authorization': `Bearer ${localStorage.getItem('tokenadm')}`
      }
    });
  }

  estaAutenticado(): boolean {
    return !!localStorage.getItem('tokenadm');
  }

  cerrarSesion() {
    localStorage.removeItem('tokenadm');
    localStorage.removeItem('sucursalId');
  }
}