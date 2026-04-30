import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class ExternalService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private authService: AuthService
  ) {}

  private getHeaders() {
    return new HttpHeaders({
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
  }

  searchPlayers(nombre: string, league: string = '140', season: string = '2023'): Observable<any> {
    const url = `${this.config.getBackendUrl()}/external/search`;
    return this.http.get(url, { 
      params: { nombre, league, season },
      headers: this.getHeaders()
    });
  }

  importPlayers(jugadores: any[], geolocalizacion: any): Observable<any> {
    return this.http.post(`${this.config.getBackendUrl()}/external/import`, {
      jugadores,
      geolocalizacion
    }, { headers: this.getHeaders() });
  }
}