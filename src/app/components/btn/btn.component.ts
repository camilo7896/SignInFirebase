import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { OverlayModule } from '@angular/cdk/overlay';

@Component({
  selector: 'app-btn',
  imports: [CommonModule, OverlayModule],
  templateUrl: './btn.component.html',
})
export class BtnComponent {
  @Input() typeBtn: 'button' | 'reset' | 'submit' | 'warning' = 'button';
  @Input() color = 'bg-green-700';

  get colors() {
    return {
      'bg-green-700': this.color === 'success',
      'hover:bg-green-800': this.color === 'success',
      'bg-orange-500': this.color === 'warning',
      'hover:bg-orange-600': this.color === 'warning',
      'bg-red-500': this.color === 'error',
      'hover:bg-red-600': this.color === 'error',
      'bg-blue-500': this.color === 'primary',
      'hover:bg-blue-600': this.color === 'primary',
      'bg-sky-400': this.color === 'sky-primary',
    };
  }
}
