import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigManagerService } from './config-manager.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private configManager: ConfigManagerService
  ) {}

  login(userDto: any) {
    return this.http.post(
      this.configManager.config.SERVER_ORIGIN + 'login',
      userDto
    );
  }
}
