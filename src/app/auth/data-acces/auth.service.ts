import { Injectable, inject, NgZone } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  UserCredential,
} from '@angular/fire/auth';

export interface User {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _auth = inject(Auth);
  private ngZone = inject(NgZone); // Para manejar la detección de cambios

  // Registro de usuario con correo y contraseña
  signUp(user: User): Promise<UserCredential> {
    return createUserWithEmailAndPassword(
      this._auth,
      user.email,
      user.password
    );
  }

  // Inicio de sesión con correo y contraseña
  signIn(user: User): Promise<UserCredential> {
    return signInWithEmailAndPassword(this._auth, user.email, user.password);
  }

  // Inicio de sesión con Google
  async signInWithGoogle(): Promise<UserCredential | null> {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(this._auth, provider);

      // Asegurar que Angular detecte el cambio de estado
      this.ngZone.run(() => {
        console.log('Usuario autenticado:', result.user);
      });

      return result;
    } catch (error) {
      console.error('Error en la autenticación con Google:', error);
      return null;
    }
  }

  // Cerrar sesión
  logout(): Promise<void> {
    return signOut(this._auth);
  }

  logOut() {
    return signOut(this._auth);
  }
}
