import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../data-acces/auth.service';
import { Router } from '@angular/router';
import { toast } from 'ngx-sonner';
import { BtnComponent } from '../../components/btn/btn.component';
import { GoogleButtonComponent } from '../ui/google-button/google-button.component';

@Component({
  selector: 'app-logout',
  imports: [BtnComponent, ReactiveFormsModule, GoogleButtonComponent],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css',
})
export class LogoutComponent {
  form: FormGroup;

  constructor(
    private _authService: AuthService,
    private _formBuilder: FormBuilder,
    private _router: Router
  ) {
    this.form = this._formBuilder.group({
      email: new FormControl<string | null>('', [
        Validators.required,
        Validators.email,
      ]),
      password: new FormControl<string | null>('', Validators.required),
      name: new FormControl<string | null>('', Validators.required),
      code: new FormControl<string | null>('', Validators.required),
    });
  }

  /**
   * Método para verificar si un campo es obligatorio
   */
  isRequired(field: 'email' | 'password') {
    const control = this.form.get(field);
    if (!control) return true;
    return control.hasValidator(Validators.required);
  }

  async submit() {
    try {
      if (this.form.valid) {
        console.log(this.form.value);
        await this._authService.signUp(this.form.value);
        toast.success('Usuario creado correctamente');
        this._router.navigateByUrl('/board');
      } else {
        this.form.markAllAsTouched();
        console.error('Formulario inválido');
        alert('Datos incorrectos');
      }
    } catch (error) {
      toast.error('Error al crear el usuario');
      console.error(error);
    }
  }
  async submitWithGoogle() {
    try {
      await this._authService.signInWithGoogle();
      toast.success('Bienvenido');
      this._router.navigateByUrl('dashboard/board');
    } catch (error) {
      toast.error('Error al iniciar sesión con Google');
      console.error(error);
    }
  }
}
