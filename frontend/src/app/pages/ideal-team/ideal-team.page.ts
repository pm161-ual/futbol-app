import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonBackButton, IonButtons, IonSpinner } from '@ionic/angular/standalone';
import { PlayerService } from '../../services/player';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-ideal-team',
  templateUrl: 'ideal-team.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonCard, IonCardContent, IonCardHeader,
    IonCardTitle, IonBackButton, IonButtons, IonSpinner
  ]
})
export class IdealTeamPage {

  idealTeam = '';
  loading = false;
  players: any[] = [];

  // Uso de Google AI Studio
  private geminiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';
  private geminiKey = 'AIzaSyAsz_M6M_ub5SxRUXzsFkWTHEqZRi_7G8M';

  constructor(
    private playerService: PlayerService,
    private http: HttpClient
  ) { }

  generateIdealTeam() {
    this.loading = true;
    this.idealTeam = '';

    this.playerService.getAll().subscribe({
      next: (res) => {
        this.players = res.result || res;
        const playerNames = this.players.map((p: any) =>
          `${p.nombre} (${p.posicion}, ${p.equipo})`
        ).join(', ');

        const prompt = `Eres un experto en fútbol. Con los siguientes jugadores disponibles: ${playerNames}. 
        Genera el mejor equipo ideal posible en formación 4-3-3. 
        Explica brevemente por qué elegiste cada jugador. Responde en español.`;

        this.http.post(`${this.geminiUrl}?key=${this.geminiKey}`, {
          contents: [{
            parts: [{ text: prompt }]
          }]
        }).subscribe({
          next: (res: any) => {
            this.idealTeam = res.candidates[0].content.parts[0].text;
            this.loading = false;
          },
          error: (err) => {
            console.error(err);
            this.loading = false;
          }
        });
      },
      error: (err) => {
        console.error(err);
        this.loading = false;
      }
    });
  }
}