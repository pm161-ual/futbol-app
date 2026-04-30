import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // URL del servlet CORBA
  private corbaUrl = 'http://localhost:8080/noticias';

  constructor(private http: HttpClient) {}

  getNews(): Observable<any> {
    return this.http.post(`${this.corbaUrl}/getServlet`, 
      new URLSearchParams({ accion: 'get' }).toString(),
      { 
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        responseType: 'text'
      }
    );
  }

  publishNews(noticia: any): Observable<any> {
    const body = new URLSearchParams({
      accion: 'put',
      titulo: noticia.titulo,
      cuerpo: noticia.cuerpo,
      fecha: noticia.fecha,
      autor: noticia.autor,
      imagen: noticia.imagen
    }).toString();

    return this.http.post(`${this.corbaUrl}/putServlet`, body, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      responseType: 'text'
    });
  }
}