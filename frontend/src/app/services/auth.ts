import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ConfigService } from './config';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient,
    private config: ConfigService,
    private auth: Auth
  ) {}

  // Firebase Auth
  async registerFirebase(email: string, password: string) {
    return createUserWithEmailAndPassword(this.auth, email, password);
  }

  async loginFirebase(email: string, password: string) {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  async logoutFirebase() {
    return signOut(this.auth);
  }

  // Backend local
  registerBackend(userData: any): Observable<any> {
    return this.http.post(`${this.config.getBackendUrl()}/auth/register`, userData);
  }

  loginBackend(credentials: any): Observable<any> {
    return this.http.post(`${this.config.getBackendUrl()}/auth/login`, credentials);
  }

  saveToken(token: string): void {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }

  logout(): void {
    localStorage.removeItem('token');
    this.logoutFirebase();
  }
}