import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BoardsComponent } from './pages/boards/boards.component';
import { LoginComponent } from './auth/login/login.component';
import { LogoutComponent } from './auth/logout/logout.component';

export const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'logup', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'board', component: BoardsComponent },
  { path: '**', component: BoardsComponent },
];
