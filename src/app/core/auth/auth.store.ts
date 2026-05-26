import { computed, inject } from '@angular/core';
import {
    patchState, signalStore, withMethods, /* ... */
    withState
} from '@ngrx/signals';
import { AuthService } from './auth.service';

type AuthState = {
    tenant: string | null;
    sucursalId: string | null;
    username: string | null;
    roles: string[];

};

const initialState: AuthState = {
    tenant: null,
    sucursalId: null,
    username: null,
    roles: []
};
