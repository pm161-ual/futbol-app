import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonInput, IonItem, IonLabel,
    IonBackButton, IonButtons
  ]
})
export class RegisterPage {

  nombre = '';
  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async register() {
    try {
      // Firebase Auth
      await this.authService.registerFirebase(this.email, this.password);

      // Backend local
      this.authService.registerBackend({
        nombre: this.nombre,
        email: this.email,
        password: this.password
      }).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.error = 'Error al registrarse';
        }
      });
    } catch (err) {
      this.error = 'Error al registrarse. El email ya existe.';
    }
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}