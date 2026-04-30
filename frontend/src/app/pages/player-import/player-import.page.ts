import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonList, IonCheckbox, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { ExternalService } from '../../services/external';
import { Geolocation } from '@capacitor/geolocation';

@Component({
  selector: 'app-player-import',
  templateUrl: 'player-import.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonItem, IonLabel, IonInput,
    IonList, IonCheckbox, IonBackButton, IonButtons,
    IonCard, IonCardContent, IonCardHeader, IonCardTitle
  ]
})
export class PlayerImportPage {

  searchNombre = '';
  searchLeague = '140';
  searchSeason = '2023';
  results: any[] = [];
  selected: any[] = [];
  loading = false;
  message = '';

  constructor(
    private externalService: ExternalService,
    private router: Router
  ) {}

  search() {
    this.loading = true;
    this.results = [];
    this.selected = [];
    this.externalService.searchPlayers(
      this.searchNombre,
      this.searchLeague,
      this.searchSeason
    ).subscribe({
      next: (res) => {
        this.results = res.result || res;
        this.loading = false;
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }

  toggleSelect(player: any) {
    const index = this.selected.findIndex(p => p.apiId === player.apiId);
    if (index === -1) {
      this.selected.push(player);
    } else {
      this.selected.splice(index, 1);
    }
  }

  isSelected(player: any): boolean {
    return this.selected.some(p => p.apiId === player.apiId);
  }

  async importSelected() {
    if (this.selected.length === 0) {
      this.message = 'Selecciona al menos un jugador';
      return;
    }
    try {
      const position = await Geolocation.getCurrentPosition();
      const geo = {
        latitud: position.coords.latitude,
        longitud: position.coords.longitude
      };
      this.externalService.importPlayers(this.selected, geo).subscribe({
        next: () => {
          this.message = 'Jugadores importados correctamente';
          setTimeout(() => this.router.navigate(['/player-list']), 1500);
        },
        error: (err) => console.error(err)
      });
    } catch {
      this.externalService.importPlayers(this.selected, { latitud: 0, longitud: 0 }).subscribe({
        next: () => {
          this.message = 'Jugadores importados correctamente';
          setTimeout(() => this.router.navigate(['/player-list']), 1500);
        },
        error: (err) => console.error(err)
      });
    }
  }
}