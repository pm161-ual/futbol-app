import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonInput, IonItem, IonLabel,
    IonBackButton, IonButtons
  ]
})
export class LoginPage {

  email = '';
  password = '';
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async login() {
    try {
      // Firebase Auth
      await this.authService.loginFirebase(this.email, this.password);
      
      // Backend local para obtener JWT
      this.authService.loginBackend({ 
        email: this.email, 
        password: this.password 
      }).subscribe({
        next: (res) => {
          this.authService.saveToken(res.token);
          this.router.navigate(['/player-list']);
        },
        error: () => {
          this.error = 'Credenciales incorrectas';
        }
      });
    } catch (err) {
      this.error = 'Credenciales incorrectas';
    }
  }

  goToRegister() {
    this.router.navigate(['/register']);
  }
}