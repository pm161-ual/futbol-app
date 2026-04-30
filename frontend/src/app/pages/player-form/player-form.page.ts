import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonBackButton, IonButtons } from '@ionic/angular/standalone';
import { PlayerService } from '../../services/player';
import { Geolocation } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Component({
  selector: 'app-player-form',
  templateUrl: 'player-form.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonItem, IonLabel, IonInput,
    IonBackButton, IonButtons
  ]
})
export class PlayerFormPage {

  player = {
    nombre: '',
    equipo: '',
    liga: '',
    posicion: '',
    edad: null,
    nacionalidad: '',
    imagen: '',
    latitud: null,
    longitud: null
  };

  constructor(
    private playerService: PlayerService,
    private router: Router
  ) {}

  async takePhoto() {
    const photo = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.DataUrl,
      source: CameraSource.Camera
    });
    this.player.imagen = photo.dataUrl || '';
  }

  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    this.player.latitud = position.coords.latitude as any;
    this.player.longitud = position.coords.longitude as any;
    alert(`Ubicación obtenida: ${this.player.latitud}, ${this.player.longitud}`);
  }

  async save() {
    if (!this.player.latitud) {
      await this.getLocation();
    }
    this.playerService.create(this.player).subscribe({
      next: () => {
        this.router.navigate(['/player-list']);
      },
      error: (err) => console.error(err)
    });
  }
}