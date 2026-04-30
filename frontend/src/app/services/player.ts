import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(
    private http: HttpClient,
    private config: ConfigService
  ) {}

  getAll(filters?: any): Observable<any> {
    const url = `${this.config.getBackendUrl()}/players`;
    return this.http.get(url, { params: filters });
  }

  getOne(id: string): Observable<any> {
    return this.http.get(`${this.config.getBackendUrl()}/players/${id}`);
  }

  create(player: any): Observable<any> {
    return this.http.post(`${this.config.getBackendUrl()}/players`, player);
  }

  update(id: string, player: any): Observable<any> {
    return this.http.put(`${this.config.getBackendUrl()}/players/${id}`, player);
  }

  delete(id: string): Observable<any> {
    return this.http.delete(`${this.config.getBackendUrl()}/players/${id}`);
  }

  addComment(playerId: string, comment: any): Observable<any> {
    return this.http.post(`${this.config.getBackendUrl()}/players/${playerId}/comments`, comment);
  }
}