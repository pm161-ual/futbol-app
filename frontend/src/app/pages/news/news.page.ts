import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonInput, IonTextarea, IonBackButton, IonButtons, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { NewsService } from '../../services/news';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-news',
  templateUrl: 'news.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonItem, IonLabel, IonInput, IonTextarea,
    IonBackButton, IonButtons, IonCard, IonCardContent,
    IonCardHeader, IonCardTitle
  ]
})
export class NewsPage implements OnInit {

  news: any[] = [];
  isAdmin = false;
  newNoticia = {
    titulo: '',
    cuerpo: '',
    fecha: '',
    autor: '',
    imagen: ''
  };
  message = '';

  constructor(
    private newsService: NewsService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isAdmin = this.authService.isLoggedIn();
    this.loadNews();
  }

  loadNews() {
    this.newsService.getNews().subscribe({
      next: (res) => {
        try {
          this.news = JSON.parse(res);
        } catch {
          this.news = [];
        }
      },
      error: (err) => console.error(err)
    });
  }

  publishNews() {
    const today = new Date();
    this.newNoticia.fecha = today.toLocaleDateString('es-ES');
    this.newsService.publishNews(this.newNoticia).subscribe({
      next: () => {
        this.message = 'Noticia publicada correctamente';
        this.loadNews();
        this.newNoticia = { titulo: '', cuerpo: '', fecha: '', autor: '', imagen: '' };
      },
      error: (err) => console.error(err)
    });
  }
}