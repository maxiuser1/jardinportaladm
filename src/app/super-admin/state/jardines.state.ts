import { inject } from "@angular/core";
import { signalStore, withState, type, patchState } from "@ngrx/signals";
import { eventGroup, Events, ReducerEvents, withEventHandlers } from '@ngrx/signals/events';
import { AuthService } from "../../core/auth/auth.service";
import { exhaustMap, tap } from "rxjs";
import { mapResponse } from '@ngrx/operators';
import { UsuarioVm } from "@model/vm/bo/usuario-vm";

type JardinState = {
    sucursalNombre: string;
    sucursal: string;
    tenant: string;
    jardin: string;
    nombres: string;
    correo: string;
    moneda: 'CLP' | 'UF';
    sucursales: Array<{ id: string; nombre: string }>;
};

const initialState: JardinState = {
    sucursalNombre: '',
    sucursal: '',
    jardin: '',
    tenant: '',
    nombres: '',
    correo: '',
    moneda: 'CLP',
    sucursales: []
};

export const jardinEvents = eventGroup({
    source: 'Jardin Modulo',
    events: {
        opened: type<void>(),
        sucursalCambiada: type<string>(),
        usuarioCargado: type<UsuarioVm>(),
    },
});

export const JardinStore = signalStore(
    { providedIn: 'root' },
    withState(initialState),
    withEventHandlers(
        (
            store,
            events = inject(Events),
            reducerEvents = inject(ReducerEvents),
            authService = inject(AuthService),
        ) => ({
            cargarUsuario$: events
                .on(jardinEvents.opened)
                .pipe(
                    exhaustMap(() => {
                        return authService.me().pipe(
                            mapResponse({
                                next: (user) => jardinEvents.usuarioCargado(user),
                                error: (err) => console.error(err)
                            })
                        );
                    })
                ),
            procesarSucursalCambiada$: reducerEvents
                .on(jardinEvents.sucursalCambiada).pipe(
                    tap(({ payload }) => {
                        patchState(store, {
                            sucursal: payload,
                            sucursalNombre: store.sucursales().find(x => x.id === payload)?.nombre ?? ''
                        });
                        localStorage.setItem('sucursalId', payload);
                    })
                ),
            procesarUsuarioCargado$: reducerEvents
                .on(jardinEvents.usuarioCargado).pipe(
                    tap(({ payload }) => {
                        patchState(store, {
                            tenant: payload.tenant.id,
                            jardin: '',
                            nombres: payload.nombres,
                            correo: payload.correo,
                            moneda: payload.tenant.moneda,
                            sucursalNombre: '',
                            sucursal: '',
                            sucursales: [],
                        });
                    })
                )
        })
    )
);