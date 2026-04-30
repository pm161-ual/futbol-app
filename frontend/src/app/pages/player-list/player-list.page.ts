import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonSearchbar, IonList, IonItem, IonLabel, IonThumbnail, IonToggle, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { PlayerService } from '../../services/player';
import { ConfigService } from '../../services/config';
import { addIcons } from 'ionicons';
import { add, search } from 'ionicons/icons';

@Component({
  selector: 'app-player-list',
  templateUrl: 'player-list.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonSearchbar, IonList,
    IonItem, IonLabel, IonThumbnail, IonToggle,
    IonButtons, IonBackButton
  ]
})
export class PlayerListPage implements OnInit {

  players: any[] = [];
  filteredPlayers: any[] = [];
  searchTerm = '';
  useJava = false;

  constructor(
    private playerService: PlayerService,
    private config: ConfigService,
    private router: Router
  ) {
    addIcons({ add, search });
  }

  ngOnInit() {
    this.loadPlayers();
  }

  loadPlayers() {
    this.playerService.getAll().subscribe({
      next: (res) => {
        this.players = res.result || res;
        this.filteredPlayers = this.players;
      },
      error: (err) => console.error(err)
    });
  }

  search(event: any) {
    const term = event.target.value.toLowerCase();
    this.filteredPlayers = this.players.filter(p =>
      p.nombre.toLowerCase().includes(term) ||
      p.equipo.toLowerCase().includes(term) ||
      p.liga.toLowerCase().includes(term)
    );
  }

  toggleBackend(event: any) {
    this.useJava = event.detail.checked;
    this.config.setBackend(this.useJava);
    this.loadPlayers();
  }

  goToDetail(id: string) {
    this.router.navigate(['/player-detail', id]);
  }

  goToForm() {
    this.router.navigate(['/player-form']);
  }

  goToImport() {
    this.router.navigate(['/player-import']);
  }
}