import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  private useJava = false;

  // URLs de los backends
  private nodeUrl = 'http://localhost:3000/api';
  private javaUrl = 'http://localhost:8081/api';

  getBackendUrl(): string {
    return this.useJava ? this.javaUrl : this.nodeUrl;
  }

  isJavaBackend(): boolean {
    return this.useJava;
  }

  setBackend(useJava: boolean): void {
    this.useJava = useJava;
  }

  toggleBackend(): void {
    this.useJava = !this.useJava;
  }
}