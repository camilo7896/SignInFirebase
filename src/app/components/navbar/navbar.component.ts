import { Component, Inject } from '@angular/core';
import { BtnComponent } from '../btn/btn.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faBell, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../auth/data-acces/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [BtnComponent, OverlayModule, FontAwesomeModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  constructor(private _authState: AuthService, private _router: Router) {}

  faBell = faBell;
  faInfoCircle = faInfoCircle;

  isOpen = false;
  isOpenBody = false;

  async logOut() {
    this._authState.logOut();
    this._router.navigateByUrl('auth/login');
  }

  layout() {
    return this._router.navigateByUrl('dashboard/layout');
  }
}
