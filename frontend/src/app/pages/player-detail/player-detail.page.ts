import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonLabel, IonTextarea, IonBackButton, IonButtons, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonIcon, IonInput } from '@ionic/angular/standalone';
import { PlayerService } from '../../services/player';
import { CommentService } from '../../services/comment';
import { AuthService } from '../../services/auth';
import { addIcons } from 'ionicons';
import { star, trash } from 'ionicons/icons';

@Component({
  selector: 'app-player-detail',
  templateUrl: 'player-detail.page.html',
  standalone: true,
  imports: [
    CommonModule, FormsModule,
    IonHeader, IonToolbar, IonTitle, IonContent,
    IonButton, IonItem, IonLabel, IonTextarea,
    IonBackButton, IonButtons, IonCard, IonCardHeader,
    IonCardTitle, IonCardContent, IonIcon, IonInput
  ]
})
export class PlayerDetailPage implements OnInit {

  player: any = null;
  comments: any[] = [];
  newComment = { autor: '', comentario: '', valoracion: 5 };
  isLoggedIn = false;
  playerId = '';

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ star, trash });
  }

  ngOnInit() {
    this.playerId = this.route.snapshot.paramMap.get('id') || '';
    this.isLoggedIn = this.authService.isLoggedIn();
    this.loadPlayer();
  }

  loadPlayer() {
    this.playerService.getOne(this.playerId).subscribe({
      next: (res) => {
        this.player = res.result || res.player || res;
        this.comments = res.comments || this.player?.comentarios || [];
      },
      error: (err) => console.error(err)
    });
  }

  addComment() {
    this.commentService.create(this.playerId, this.newComment).subscribe({
      next: () => {
        this.loadPlayer();
        this.newComment = { autor: '', comentario: '', valoracion: 5 };
      },
      error: (err) => console.error(err)
    });
  }

  deleteComment(commentId: string) {
    this.commentService.delete(commentId).subscribe({
      next: () => this.loadPlayer(),
      error: (err) => console.error(err)
    });
  }
}