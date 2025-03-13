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

interface FormSigUp {
  email: FormControl<string | null>;
  password: FormControl<string | null>;
}

@Component({
  selector: 'app-login',
  imports: [BtnComponent, ReactiveFormsModule, GoogleButtonComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
    console.log('submit, clicado');
    try {
      if (this.form.valid) {
        console.log(this.form.value);
        await this._authService.signIn(this.form.value);
        toast.success('Hola nuevamente');
        this._router.navigateByUrl('dashboard/board');
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

  logout() {
    this._authService.logout(); // Aquí puedes limpiar el token o cerrar sesión
    this._router.navigate(['/login']);
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
