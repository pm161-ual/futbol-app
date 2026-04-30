import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonIcon, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';
import { addIcons } from 'ionicons';
import { football, search, person, list, newspaper, trophy } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonIcon, IonGrid, IonRow, IonCol
  ]
})
export class HomePage {

  constructor(private router: Router) {
    addIcons({ football, search, person, list, newspaper, trophy });
  }

  goTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}