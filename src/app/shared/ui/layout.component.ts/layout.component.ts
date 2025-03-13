import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-layout',
  imports: [RouterModule],
  template: `<router-outlet />`,
})
export class LayoutComponent {
  constructor() {
    console.log('Hola');
  }
}
