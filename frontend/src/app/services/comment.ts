import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  getByPlayer(playerId: string): Observable<any> {
    const url = this.config.isJavaBackend()
      ? `http://localhost:8082/api/comments/player/${playerId}`
      : `${this.config.getBackendUrl()}/players/${playerId}/comments`;
    return this.http.get(url);
  }

  create(playerId: string, comment: any): Observable<any> {
    const url = this.config.isJavaBackend()
      ? `http://localhost:8082/api/comments`
      : `${this.config.getBackendUrl()}/players/${playerId}/comments`;
    
    const body = this.config.isJavaBackend()
      ? { ...comment, playerId }
      : comment;

    return this.http.post(url, body);
  }

  delete(commentId: string): Observable<any> {
    const url = this.config.isJavaBackend()
      ? `http://localhost:8082/api/comments/${commentId}`
      : `${this.config.getBackendUrl()}/players/comments/${commentId}`;
    return this.http.delete(url);
  }
}