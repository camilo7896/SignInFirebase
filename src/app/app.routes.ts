import { Routes } from '@angular/router';
import { BoardsComponent } from './pages/boards/boards.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';
import { privateGuarded, publicGuarded } from './core/auth.guard';

export const routes: Routes = [
  // Rutas públicas protegidas con `publicGuarded`
  {
    path: 'auth',
    canActivate: [publicGuarded], // ✅ Protección correcta
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
    ],
  },
  // Rutas privadas protegidas con `privateGuarded`
  {
    path: 'dashboard',
    canActivate: [privateGuarded], // ✅ Protección correcta
    children: [{ path: 'board', component: BoardsComponent }],
  },
  // Ruta de fallback
  { path: '**', component: LoginComponent },
];
