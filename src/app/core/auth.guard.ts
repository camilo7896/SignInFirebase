import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';
import { AuthStateService } from '../data-acces/data-acces/auth-state.service';
import { map, take } from 'rxjs';

export const privateGuarded: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return authState.authState$.pipe(
    take(1), // Asegura que se tome solo el primer valor del observable
    map((isAuthenticated) => {
      if (!isAuthenticated) {
        router.navigateByUrl('auth/login');
        return false;
      }
      return true;
    })
  );
};

export const publicGuarded: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authState = inject(AuthStateService);

  return authState.authState$.pipe(
    take(1),
    map((isAuthenticated) => {
      if (isAuthenticated) {
        router.navigateByUrl('/tasks');
        return false;
      }
      return true;
    })
  );
};
